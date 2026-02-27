import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
});


// In pg, if connectionString exists, it overrides the other fields.
// So in production (Render, Railway, Neon), you usually only use:
// new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false }
// });


// For local development, either:
// Use only individual PG_* variables
// OR
// Use only DATABASE_URL
// Not both.