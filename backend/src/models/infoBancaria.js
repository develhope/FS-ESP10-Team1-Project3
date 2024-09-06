const pool = require("../config/db");

const getAccounts = async () => {
    const result = await pool.query("SELECT * FROM infoBancaria");
    return result.rows;
  };

  const createAccount = async (account) => {
    const {propietario, numeroCuenta, titular, pais, moneda} = account;
  const result = await pool.query(
    "INSERT INTO infoBancaria ( propietario, titular, numero_cuenta, pais, moneda) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [ propietario ,titular, numeroCuenta, pais, moneda ]
  );
  return result.rows[0];
  };
  
module.exports = { getAccounts, createAccount };