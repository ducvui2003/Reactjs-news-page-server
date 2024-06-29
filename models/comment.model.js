import pool from "../configs/db.config.js";

export async function getByNews(newsId) {
  const sql = "SELECT * FROM comment WHERE newsId = ?";
  const values = [newsId];
  try {
    const [result] = await pool.query(sql, values);
    return result;
  } catch (err) {
    return null;
  }
}

export async function getByUser(email) {
  const sql =
    "SELECT comment.* FROM comment join user on comment.userId = user.id WHERE email = ?";
  const values = [email];
  try {
    const [result] = await pool.query(sql, values);
    return result;
  } catch (err) {
    return null;
  }
}

export async function create(comment) {
  const sql =
    "INSERT INTO comment (userId, newsId, content, createAt) VALUES (?, ?, ?, ?)";
  const values = [
    comment.userId,
    comment.newsId,
    comment.content,
    comment.createAt,
  ];
  try {
    const [result] = await pool.query(sql, values);
    return result.insertId;
  } catch (err) {
    return false;
  }
}

export async function remove(commentId) {
  const sql = "DELETE FROM comment WHERE id = ?";
  const values = [commentId];
  try {
    await pool.query(sql, values);
    return result.affectedRows > 0;
  } catch (err) {
    return false;
  }
}

export async function update(comment) {
  const sql = "UPDATE comment SET content = ? WHERE id = ?";
  const values = [comment.content, comment.id];
  try {
    const [result] = await pool.query(sql, values);
    return result.affectedRows > 0;
  } catch (err) {
    return false;
  }
}
