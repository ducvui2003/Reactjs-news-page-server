// routes/index.js
import { Router } from "express";
import weatherRouter from "./weather.js";
import newsRouter from "./news.js";
import authRouter from "./auth.js";
import commentRouter from "./comment.js";
const router = Router();

router.use("/weather", weatherRouter);
router.use("/news", newsRouter);
router.use("/auth", authRouter);
router.use("/comment", commentRouter);

export default router;
