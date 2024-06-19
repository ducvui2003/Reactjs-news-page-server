require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
const PORT = process.env.PORT;

var corsOptions = {
  origin: process.env.URL_CLIENT_PRODUCTION || process.env.URL_CLIENT_DEV,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const createErrorXml = (message, status) => {
  return `
        <?xml version="1.0" encoding="UTF-8"?>
        <error>
            <message>${message}</message>
            <status>${status}</status>
        </error>
    `;
};
app.get("/", cors(corsOptions), async (req, res, next) => {
  //   res.json({ msg: "This is CORS-enabled for a Single Route" });
  res.set("Content-Type", "application/xml");
  const { category } = req.query;
  if (!category) {
    const errorXml = createErrorXml(
      "Category query parameter is required",
      400
    );
    return res.status(400).send(errorXml);
  }

  try {
    const response = await axios.get(`${process.env.URL_NEWS}${category}.rss`);
    res.status(200).send(response.data);
  } catch (err) {
    const errorXml = createErrorXml(
      "An error occurred while fetching the RSS feed.",
      500
    );
    res.status(500).send(errorXml);
  }
});

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

app.get("/weather", cors(corsOptions), async (req, res, next) => {
  try {
    const response = await axios.get(process.env.URL_WEATHER);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(404);
  }
});

app.get("/geo", cors(corsOptions), async (req, res, next) => {
  try {
    const response = await axios.get(process.env.URL_WEATHER);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(404);
  }
});

app.get("/lookup", cors(corsOptions), async (req, res, next) => {
  try {
    const response = await axios.get(process.env.URL_IP_LOOKUP);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(404);
  }
});
