const ProjectsModel = require('../models/Projects');

// Obtener todos los proyectos

const getAllProjects = async (req, res) => {
    try {
        const projectsResult = await ProjectsModel.getProjects();
        res.status(200).json(projectsResult);
    } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
};

// Obtener un proyecto por ID

const getProjectById = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await ProjectsModel.getProjectById(id);
  
      if (!project) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
      return res.status(200).json(project);
    } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
  };


  // Crear un nuevo proyecto 

 const createProject = async (req, res) => {
    try {
      const { creator_id, name, description } = req.body;

    // Validar que todos los campos estén presentes
    if (!creator_id || !name || !description) {
        return res.status(400).json({ message: 'Faltan campos necesarios' });
      }

      const newProject = await ProjectsModel.createProject(creator_id, name, description);
  
      return res.status(201).json(newProject);
    } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
  };

module.exports = { getAllProjects, getProjectById, createProject};