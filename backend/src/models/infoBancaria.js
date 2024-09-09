const pool = require("../config/db");

const filterByToken = async (token) => {
    const result = await pool.query("SELECT * FROM infoBancaria WHERE propietario=(SELECT user_id FROM users WHERE token=$1)",
      [token]);
    return result.rows;
  };

  const createAccount = async (account) => {
    const {propietario, numero_cuenta, titular, pais, moneda, seleccionada} = account;
  const result = await pool.query(
    "INSERT INTO infoBancaria ( propietario, titular, numero_cuenta, pais, moneda, seleccionada) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [ propietario ,titular, numero_cuenta, pais, moneda, seleccionada ]
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
  const getPropetario = async (token) => {
    const result = await pool.query("SELECT user_id FROM users WHERE token=$1",
      [token]);
      return result.rows[0].user_id;
  };
  const selectAccount = async (numero_cuenta) => {
    await pool.query('UPDATE infoBancaria SET seleccionada = false WHERE seleccionada = true');
    const result = await pool.query(
      'UPDATE infoBancaria SET seleccionada = true WHERE numero_cuenta = $1 RETURNING *',
      [numero_cuenta]
    );
    return result.rows[0];
  };
  
module.exports = { filterByToken, createAccount, deleteAccount, getPropetario, selectAccount };