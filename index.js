require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const xml2js = require("xml2js");

const app = express();
app.use(cors());
const PORT = process.env.PORT;

var corsOptions = {
  origin: process.env.URL_CLIENT,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get("/", cors(corsOptions), async (req, res, next) => {
  //   res.json({ msg: "This is CORS-enabled for a Single Route" });
  const { category } = req.query;
  if (!category) {
    return res
      .status(400)
      .json({ error: "Category query parameter is required" });
  }

  try {
    const response = await axios.get(`${process.env.URL_NEWS}${category}.rss`);
    const data = await xml2js.parseStringPromise(response.data, {
      mergeAttrs: true,
    });
    res.json(data.rss);
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while fetching the RSS feed.");
  }
});

app.listen(PORT, function () {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});

// Use CORS middleware

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", process.env.URL_CLIENT);
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });
// app.get("/", cors(corsOptions), (req, res) => res.send("Hello World!"));
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
