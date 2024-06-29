import { Router } from "express";

import { login, logout, register } from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter.get("/hello", (req, res) => {
  res.send("Hello, Auth!");
});

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);

export default authRouter;
