const pool = require("../config/db");

// Obtener todas las habilidades
const getSkills = async () => {
   const result = await pool.query("SELECT * FROM skills");
   return result.rows;
};

// Añadir una habilidad nueva
const addSkill = async (name) => {
   const result = await pool.query(
       "INSERT INTO skills (name) VALUES ($1) RETURNING *",
       [name]
   );
   return result.rows[0]; // Devolver la habilidad creada
};

// Eliminar una habilidad por ID
const deleteSkill = async (skill_id) => {
   await pool.query("DELETE FROM skills WHERE skill_id = $1", [skill_id]);
};

module.exports = { getSkills, addSkill, deleteSkill };
