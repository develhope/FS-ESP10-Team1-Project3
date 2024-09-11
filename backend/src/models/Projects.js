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
    "INSERT INTO projects ( creator_id, name, description) VALUES ($1, $2, $3) RETURNING *", [creator_id, name, description]);
  return result.rows[0];
};

const updateProject = async (id, name, description, status, developer_id) => {
  const result = await pool.query(
    'UPDATE projects SET name = $1, description = $2, status = $3, developer_id = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
    [name, description, status, developer_id, id]
  );
  const updatedProject = result.rows[0];

  return updatedProject; // Actualiza el proyecto y lo devuelve ya actualizado.
};

const deleteProject = async (id) => {

  const result = await pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
  return result.rows[0]; // Devuelve el proyecto eliminado o undefined si no se encontró.
};

  module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };



