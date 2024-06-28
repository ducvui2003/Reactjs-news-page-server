import { Router, json } from "express";
import ApiError from "../utils/ApiError.js";
import { login, register } from "../services/authenticate.services.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
const user = {
  email: "admin",
  password: "admin",
};

const authRouter = Router();
authRouter.get("/", (req, res) => {
  res.send("Hello, Auth!");
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const loginSuccess = login(email, password);
  if (!loginSuccess) {
    throw new ApiError(401, "Incorrect email or password");
  }
  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  });
  res.status(200).json({ accessToken });
});

authRouter.post("/register", (req, res) => {
  try {
    const { email, password, rePassword } = req.body;
    if (password !== rePassword) {
      throw new ApiError(400, "Passwords do not match");
    }
    register({ email, password });
    res
      .status(200)
      .json({ statusCode: 200, message: "User created successfully" });
  } catch (err) {
    console.log(err);
  }
});

authRouter.get("/logout", (req, res) => {});
export default authRouter;
