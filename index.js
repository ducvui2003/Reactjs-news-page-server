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

app.get("/", cors(corsOptions), async (req, res, next) => {
    //   res.json({ msg: "This is CORS-enabled for a Single Route" });
    const {category} = req.query;
    if (!category) {
        return res
            .status(400)
            .json({error: "Category query parameter is required"});
    }

    try {
        const response = await axios.get(`${process.env.URL_NEWS}${category}.rss`);
        // const data = await xml2js.parseStringPromise(response.data, {
        //   mergeAttrs: true,
        // });
        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send("An error occurred while fetching the RSS feed.");
    }
});

app.listen(PORT, function () {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
});