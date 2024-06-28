import { createUser, getUserByEmail } from "../models/user.modal.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/hashing.js";

export const login = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Incorrect password");
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const register = async (user) => {
  try {
    const isExist = await getUserByEmail(user.email);
    if (isExist) {
      throw new ApiError(409, "User already exists");
    }
    user.password = await hashPassword(user.password);
    const createSuccess = await createUser(user);
    if (!createSuccess) {
      throw new ApiError(409, "Internal Server Error");
    }
  } catch (err) {
    throw new ApiError(500, "Internal Server Error");
  }
};
