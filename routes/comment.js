import { Router } from "express";

import {
  create,
  getByNewsId,
  getCommentByEmail,
  remove,
  update,
} from "../controllers/comment.controller.js";

const commentRouter = Router();
commentRouter.get("/hello", (req, res) => {
  res.send("Hello, comment!");
});

commentRouter.get("/news/get", getByNewsId);
commentRouter.get("/user/get", getCommentByEmail);
commentRouter.post("/create", create);
commentRouter.put("/update/:id", update);
commentRouter.delete("/delete/:id", remove);

export default commentRouter;
