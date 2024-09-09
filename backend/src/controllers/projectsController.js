const ProjectsModel = require('../models/Projects');

// Obtener todos los proyectos

const getAllProjects = async (req, res) => {
    try {
        const projectsResult = await ProjectsModel.getProjects();
        res.status(200).json(projectsResult);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Obtener un proyecto por ID

const getProject = async (req, res) => {
    try {
      const { id } = req.params;
      const projectResult = await ProjectsModel.getProjectById(id);
      const project = projectResult.rows[0];
  
      if (!project) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }

      return res.status(200).json(project);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  // Crear un nuevo proyecto 

 const createProject = async (req, res) => {
    try {
      const { creator_id, name, description } = req.body;
      const newProject = await ProjectsModel.createProject(creator_id, name, description);
  
      return res.status(201).json(newProject);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { getAllProjects, getProject, createProject};