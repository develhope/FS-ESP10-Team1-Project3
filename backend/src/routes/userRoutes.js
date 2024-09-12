// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bankController = require('../controllers/bankController');
const skillsController = require('../controllers/skillsController');
const projectsController = require('../controllers/projectsController');
const servicesController = require('../controllers/servicesController');
const multer = require('multer');
const path = require('path'); 
const fs = require('fs'); 
const passport = require('../config/passport');

//creacion de un archivo upload para guardar imagenes y configuracion de multer
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // Limita el tamaño del archivo a 5MB
      fieldSize: 25 * 1024 * 1024 // Aumenta el límite del campo a 25MB
    }})


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





//Tabla skills routes
router.get('/skills', skillsController.getAllSkills);      
router.post('/skills', skillsController.createSkill);     
router.delete('/skills/:id', skillsController.deleteSkill); 

//Tabla Projects routes

router.get('/projects', projectsController.getProjects);
router.get('/projects:projectId', projectsController.getProjectById);
router.post('/projects', projectsController.createProject);
router.put('/projects', projectsController.updateProject);
router.delete('/projects/:id', projectsController.deleteProject);





//rutas protegidas
//tabla services routes
router.post('/services', passport.authenticate('jwt', { session: false }), upload.single('imagen'), servicesController.createService);
router.get('/services/offers', passport.authenticate('jwt', { session: false }), servicesController.getAllOffers);
//tabla infobancaria routes
router.post('/bankInfo/filterByToken', bankController.getAllAccountsByToken);
router.post('/bankInfo', bankController.createAcc);
router.delete('/bankInfo', bankController.deleteAcc);
router.put('/bankInfo/selected', bankController.selectAcc);

module.exports = router;