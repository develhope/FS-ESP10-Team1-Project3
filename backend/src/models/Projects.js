const pool = require("../config/db");


// Estas funciones solo realizan una consulta SQL y devuelven los resultados.

const getProjects = async () => {
    const result = await pool.query("SELECT * FROM projects");
    return result.rows; 
};

const getProjectById = async (id) => {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
    return result.rows[0];
  };
  

const createProject = async (creator_id, name, description) => {
    const result = await pool.query(
"INSERT INTO projects ( creator_id, name, description) VALUES ($1, $2, $3) RETURNING *", [ creator_id, name, description ]);
    return result.rows[0];
  };

module.exports = { getProjects, getProjectById, createProject };
