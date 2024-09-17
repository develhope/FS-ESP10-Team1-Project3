const pool = require("../config/db");

// Obtener todas las habilidades
const filterByToken = async (token) => {
   const result = await pool.query("SELECT * FROM skills WHERE skill_id IN (SELECT skill_id FROM user_skills WHERE user_id=(SELECT user_id FROM users WHERE token=$1))",
     [token]);
   return result.rows;
 };
 const getSkillByName = async (name) => {
   const result = await pool.query("SELECT * FROM skills WHERE name=$1",
     [name]);
   return result.rows[0];
};

// Añadir una habilidad nueva
const addSkill = async (skillId, userId) => {
   const result = await pool.query(
    `INSERT INTO user_skills (user_id, skill_id) 
     VALUES ($1, $2) 
     ON CONFLICT (user_id, skill_id) DO NOTHING 
     RETURNING *`,
    [userId, skillId]
  );
   return result.rows[0]; // Devolver la habilidad creada
};
// Eliminar una habilidad por ID
const deleteSkill = async (skill_id, user_id) => {
   await pool.query("DELETE FROM user_skills WHERE skill_id = $1 AND user_id=$2", [skill_id, user_id]);
};

const selectSkill = async (userId, name) => {
   const result = await pool.query(
      `SELECT skills.skill_id 
       FROM skills 
       JOIN user_skills ON skills.skill_id = user_skills.skill_id 
       WHERE user_skills.user_id = $1 AND skills.name = $2`,
      [userId, name]
    );
    console.log("Resultado de la consulta:", result.rows);
    if (result.rows.length === 0) {
      throw new Error("habilidad no encontrada")
  }
    return result.rows[0].skill_id;
}


module.exports = { addSkill, deleteSkill, selectSkill, getSkillByName, filterByToken };
