const pool = require("../config/db");

const createService = async (account) => {
    const {titulo, pago, descripcion, categoria, imagen_path, creator_id } = account;
  const result = await pool.query(
    "INSERT INTO services ( titulo, pago, descripcion, categoria, imagen_path, creator_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [ titulo, pago, descripcion, categoria, imagen_path, creator_id ]
  );
  return result.rows[0];
  };
  const getOffers = async () => {
    const result = await pool.query("SELECT * FROM services");
    return result.rows;
  };
module.exports = { createService, getOffers };