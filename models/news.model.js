import pool from "../configs/db.config.js";

export async function getNewsById(newsId) {
  const sql = "SELECT * FROM news WHERE id = ?";
  const values = [newsId];
  try {
    const [result] = await pool.query(sql, values);

    return result[0];
  } catch (err) {
    return false;
  }
}
