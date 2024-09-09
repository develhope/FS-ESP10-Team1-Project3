// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bankController = require('../controllers/bankController');
const skillsController = require('../controllers/skillsController');
const proyectsController = require('../controllers/projectsController');

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
router.get('/bankInfo', bankController.getAllAccounts);
router.post('/bankInfo', bankController.createAcc);
router.delete('/bankInfo', bankController.deleteAcc);

module.exports = router;

//Tabla skills routes
router.get('/skills', skillsController.getAllSkills);

//Tabla Projects ruotes

router.get('/proyects', proyectsController.getAllProjects);
router.get('/proyects:proyectId', proyectsController.getProjectById);
router.post('/proyects', proyectsController.createProject);