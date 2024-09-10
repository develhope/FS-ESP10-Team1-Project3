const skillModel = require("../models/skills");

// Obtener todas las habilidades
const getAllSkills = async (req, res) => {
   try {
       const skills = await skillModel.getSkills();
       res.json(skills);
   } catch (error) {
       console.error("Error fetching skills:", error);
       res.status(500).json({ error: 'Failed to fetch skills' });
   }
};

// Añadir una habilidad nueva
const createSkill = async (req, res) => {
   const { name } = req.body;

   if (!name) {
       return res.status(400).json({ error: 'Skill name is required' });
   }

   try {
       const newSkill = await skillModel.addSkill(name);
       res.status(201).json(newSkill); // 201 = creado
   } catch (error) {
       console.error("Error creating skill:", error);
       res.status(500).json({ error: 'Failed to create skill' });
   }
};

// Eliminar una habilidad
const deleteSkill = async (req, res) => {
   const { id } = req.params;

   try {
       await skillModel.deleteSkill(id);
       res.status(204).send(); // 204 = No Content (se eliminó correctamente)
   } catch (error) {
       console.error("Error deleting skill:", error);
       res.status(500).json({ error: 'Failed to delete skill' });
   }
};

module.exports = { getAllSkills, createSkill, deleteSkill };
