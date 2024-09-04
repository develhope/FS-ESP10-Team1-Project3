// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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
module.exports = router;
 