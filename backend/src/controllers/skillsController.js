const skillModel = require("../models/skills");
const bankModel = require('../models/infoBancaria');

// Obtener todas las habilidades
const getAllSkills = async (req, res) => {
   try {
    const skills = await skillModel.filterByToken(req.body.token);
       res.json(skills);
   } catch (error) {
       console.error("Error fetching skills:", error);
       res.status(500).json({ error: 'Failed to fetch skills' });
   }
};

// Añadir una habilidad nueva
const createSkill = async (req, res) => {
   const { name, token } = req.body;
   if (!name) {
       return res.status(400).json({ error: 'Skill name is required' });
   }
    try {
    const userId = await bankModel.getPropetario(token);
    console.log("name: ", name, "token: ", token);
    
    const skillId = await skillModel.getSkillByName(name);
    console.log("entra ", skillId.skill_id);
    
    const newSkill = await skillModel.addSkill(skillId.skill_id, userId);
       res.status(201).json(newSkill); // 201 = creado
   } catch (error) {
       console.error("Error creating skill:", error);
       res.status(500).json({ error: 'Failed to create skill' });
   }
};

// Eliminar una habilidad
const deleteSkill = async (req, res) => {
   const { token, name } = req.body;
   const propietario = await bankModel.getPropetario(token);
   console.log(propietario);
   if (!propietario) {
    return res.status(404).json({ error: 'usuario no encontrado' });
}
    const skillToDelete = await skillModel.selectSkill(propietario, name);
   try {
       await skillModel.deleteSkill(skillToDelete, propietario);
       res.status(204).send(); // 204 = No Content (se eliminó correctamente)
   } catch (error) {
       console.error("Error deleting skill:", error);
       res.status(500).json({ error: 'Failed to delete skill' });
   }
};

module.exports = { getAllSkills, createSkill, deleteSkill };
