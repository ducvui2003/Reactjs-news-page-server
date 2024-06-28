import "dotenv/config";
import mysql from "mysql2/promise";

// Create the connection to database
const pool = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "3306",
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "123",
  database: process.env.DB_NAME || "news_page",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
