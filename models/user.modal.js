import pool from "../configs/db.config.js";
export async function createUser(user) {
  const sql = "INSERT INTO user (email, password) VALUES (?, ?)";
  const values = [user.email, user.password];
  try {
    const [result] = await pool.query(sql, values);
    return result.insertId;
  } catch (err) {
    return null;
  }
}
export async function getUserByEmail(email) {
  const sql = "SELECT * FROM user WHERE email = ?";
  try {
    const [result] = await pool.query(sql, [email]);
    return result[0];
  } catch (err) {
    return null;
  }
}
