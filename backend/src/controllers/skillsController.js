const skillModel = require("../models/skills");

const getAllSkills = async (req, res) => {
   try {
       const skills = await skillModel.getSkills();
       res.json(skills);
   } catch (error) {
       res.status(500).json({ error: 'Internal server error' });
   }
};

module.exports = { getAllSkills};