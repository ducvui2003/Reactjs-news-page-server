import { createUser, getUserByEmail } from "../models/user.modal.js";
import ApiError from "../utils/ApiError.js";
import { hashPassword, verifyPassword } from "../utils/hashing.js";

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return await verifyPassword(password, user.password);
};

export const registerUser = async (user) => {
  const isExist = await getUserByEmail(user.email);
  if (isExist) {
    throw new ApiError(409, "User already exists");
  }
  user.password = await hashPassword(user.password);
  return await createUser(user);
};
