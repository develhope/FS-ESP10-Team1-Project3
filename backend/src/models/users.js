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
  const { email, password_hash, full_name, date_of_birth } = user;
  const result = await pool.query(
    "INSERT INTO users ( email, password_hash, full_name, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *",
    [ email, password_hash, full_name, date_of_birth ]
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
  const checkToken = async (jwtoken) => {
    const result = await pool.query(
      `SELECT token FROM users WHERE token=$1`,
      [jwtoken]
    );
    return result.rows[0];
  };
  const deleteToken = async (jwtoken) => {
    const result = await pool.query(
      `UPDATE users SET token = NULL WHERE token = $1 RETURNING *`,
      [jwtoken]
    );
    return result.rows[0];
  };
  const deleteUser = async (email) => {
    const result = await pool.query(
      'DELETE FROM users WHERE email = $1 RETURNING *',
      [email]
    );
    return result.rows[0];
  };

module.exports = { getUsers, getUserById, createUser, getUserByEmail, generateToken, checkToken, deleteToken, deleteUser };
