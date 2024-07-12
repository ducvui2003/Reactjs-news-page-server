require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
const PORT = process.env.PORT;
const allowedOrigins = [process.env.URL_CLIENT_DEV, process.env.URL_CLIENT_PRODUCTION];
console.log(allowedOrigins)
const corsOptions = {
    origin: (origin, callback) => {
        console.log("allowedOrigins", allowedOrigins)
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.listen(PORT, function () {
    console.log(`CORS-enabled web server listening on port ${PORT}`);
});

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
    res.set("Content-Type", "application/xml");
    const {category} = req.query;
    if (!category) {
        const errorXml = createErrorXml(
            "Category query parameter is required",
            400
        );
        return res.status(400).send(errorXml);
    }

    try {
        const response = await axios.get(`${process.env.URL_NEWS}${category}.rss`, {
            timeout: 5000
        });
        res.status(200).send(response.data);
    } catch (err) {
        const errorXml = createErrorXml(
            "An error occurred while fetching the RSS feed.",
            500
        );
        res.status(500).send(errorXml);
    }
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
        console.log("ip:", req.ip)
        const response = await axios.get(`${process.env.URL_WEATHER}/${req.ip}?token=afe87b3f684fe8`);
        res.status(200).send(response.data);
    } catch (e) {
        res.status(404);
    }
});
