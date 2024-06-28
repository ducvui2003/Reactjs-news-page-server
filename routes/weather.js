// routes/index.js
import { Router } from "express";
import axios from "axios";

const weatherRouter = Router();

weatherRouter.get("/", (req, res) => {
  res.send("Hello, World!");
});
weatherRouter.get("/detail", async (req, res, next) => {
  try {
    const response = await axios.get(process.env.URL_WEATHER);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(404);
  }
});

weatherRouter.get("/geo", async (req, res, next) => {
  try {
    const response = await axios.get(process.env.URL_WEATHER);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(404);
  }
});

weatherRouter.get("/lookup", async (req, res, next) => {
  try {
    const response = await axios.get(process.env.URL_IP_LOOKUP);
    res.status(200).send(response.data);
  } catch (e) {
    res.status(404);
  }
});

export default weatherRouter;
