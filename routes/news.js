// routes/index.js
import { Router } from "express";
import axios from "axios";
const newsRouter = Router();

newsRouter.get("/test", (req, res) => {
  res.send("Hello, World!");
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
newsRouter.get("/", async (req, res, next) => {
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

export default newsRouter;
