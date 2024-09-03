// src/models/user.js
const pool = require("../config/db");

const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (userId) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);
  return result.rows[0];
};

const createUser = async (user) => {
  const { username, email, password_hash, full_name, date_of_birth } = user;
  const result = await pool.query(
    "INSERT INTO users (username, email, password_hash, full_name, date_of_birth) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [username, email, password_hash, full_name, date_of_birth ]
  );
  return result.rows[0];
};
const getUserByEmail = async (userDataTry) => {
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [userDataTry.email]
    );
    return result.rows[0];
  };
const generateToken = async (dataId, dataToken) => {
    const result = await pool.query(
        `UPDATE users SET token = $2 WHERE user_id = $1 RETURNING *`,
        [dataId, dataToken]
      );
    return result.rows[0];
  };

module.exports = { getUsers, getUserById, createUser, getUserByEmail, generateToken };
