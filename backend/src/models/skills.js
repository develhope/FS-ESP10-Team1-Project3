const pool = require("../config/db");

const getSkills = async () => {
    const result = await pool.query("SELECT * FROM skills");
    return result.rows; 
}

module.exports = { getSkills };

