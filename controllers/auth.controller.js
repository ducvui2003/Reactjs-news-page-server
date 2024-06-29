import jwt from "jsonwebtoken";
import "dotenv/config";
import ApiError from "../utils/ApiError.js";
import { registerUser, loginUser } from "../services/authenticate.services.js";
import { tokenBlacklist } from "../middlewares/blacklist.js";
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await registerUser({ email, password });
    res.status(200).json({ statusCode: 200, message: createdUser });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginSuccess = loginUser(email, password);
    if (!loginSuccess) {
      throw new ApiError(401, "Incorrect email or password");
    }
    const accessToken = jwt.sign(
      {
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      }
    );
    res.status(200).json({
      statusCode: 200,
      message: "success",
      data: {
        email: email,
        accessToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  // Add token to blacklist
  tokenBlacklist.push(token);
  res.status(200).json({
    statusCode: 200,
    message: "Token invalidated successfully",
  });
};
