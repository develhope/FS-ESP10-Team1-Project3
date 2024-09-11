// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bankController = require('../controllers/bankController');
const skillsController = require('../controllers/skillsController');
const projectsController = require('../controllers/projectsController');

//tabla users routes
router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUser);
router.post('/users', userController.createUser);
router.post('/users/login', userController.logIn);
router.post('/users/token', userController.checkIfLoged);
router.put('/users/logout', userController.logOut);
router.delete('/users', userController.deleteUser);
router.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

//tabla infobancaria routes
router.post('/bankInfo/filterByToken', bankController.getAllAccountsByToken);
router.post('/bankInfo', bankController.createAcc);
router.delete('/bankInfo', bankController.deleteAcc);
router.put('/bankInfo/selected', bankController.selectAcc);

module.exports = router;

//Tabla skills routes
router.get('/skills', skillsController.getAllSkills);      
router.post('/skills', skillsController.createSkill);     
router.delete('/skills/:id', skillsController.deleteSkill); 

//Tabla Projects ruotes

router.get('/projects', projectsController.getProjects);
router.get('/projects:projectId', projectsController.getProjectById);
router.post('/projects', projectsController.createProject);
router.put('/projects', projectsController.updateProject);
router.delete('/projects/:id', projectsController.deleteProject);