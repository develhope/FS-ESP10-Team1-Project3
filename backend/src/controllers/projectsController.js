const { query } = require('express');
const ProjectsModel = require('../models/Projects');
const bankModel = require('../models/infoBancaria');


// Obtener todos los proyectos

const getProjects = async (req, res) => {
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

  // const createProject = async (creator_id, name, pago ) => {
  //   const result = await pool.query(
  //     "INSERT INTO projects ( creator_id, name, pago) VALUES ($1, $2, $3)", [creator_id, name, pago]);
  //   return result.rows[0];
  // };

  // Crear un nuevo proyecto 

 const postProject = async (req, res) => {
    try {
      
      const { token, name, pago } = req.body;

      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
      }
      const creator_id = await bankModel.getPropetario(token);

    // Validar que todos los campos estén presentes

    if (!creator_id || !name || !pago) {
        return res.status(400).json({ message: 'Faltan campos necesarios' });
      }

      const newProject = await ProjectsModel.createProject(creator_id, name, pago);
  
      return res.status(201).json(newProject);
    } catch (error) {
    return res.status(500).json({ error: `Internal server error: ${error.message}` });
    
    }
  };

  const updateProject = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, pago, status, developer_id } = req.body;
  
      const projectResult = await ProjectsModel.updateProject(id, name, pago, status, developer_id);
  
  
      if (!projectResult) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
  
      return res.status(200).json(projectResult);
    } catch (error) {
      return res.status(500).json({ error: `Internal server error: ${error.message}` });
      
    }
  };
  
    // Eliminar un proyecto
  
    const deleteProject = async (req, res) => {
      try {
        const { id } = req.params;
        const result = await ProjectsModel.deleteProject(id);
  
        if (!result) {
          return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        return res.status(200).json({ message: 'Proyecto eliminado exitosamente' });
  
      } catch (error) {
  
        return res.status(500).json({ error: `Internal server error: ${error.message}` });
      }
    };
  
  
  
module.exports = { getProjects, getProjectById, postProject, updateProject, deleteProject };