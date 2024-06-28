import bcrypt from "bcrypt";
import ApiError from "./ApiError.js";
const saltRounds = 10; // The cost factor for generating the salt

// Function to hash a password
export async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    throw new ApiError(500, "Hashing Error");
  }
}

export async function verifyPassword(plainPassword, hashedPassword) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (err) {
    throw new ApiError(500, "Hashing Error");
  }
}
