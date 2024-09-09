const pool = require("../config/db");

const getAccounts = async () => {
    const result = await pool.query("SELECT * FROM infoBancaria");
    return result.rows;
  };

  const createAccount = async (account) => {
    const {propietario, numeroCuenta, titular, pais, moneda, seleccionada} = account;
  const result = await pool.query(
    "INSERT INTO infoBancaria ( propietario, titular, numero_cuenta, pais, moneda) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [ propietario ,titular, numeroCuenta, pais, moneda ]
  );
  return result.rows[0];
  };
  const deleteAccount = async (numeroCuenta) => {
    const result = await pool.query(
      'DELETE FROM infoBancaria WHERE numero_cuenta = $1 RETURNING *',
      [numeroCuenta]
    );
    return result.rows[0];
  };
  
module.exports = { getAccounts, createAccount, deleteAccount };