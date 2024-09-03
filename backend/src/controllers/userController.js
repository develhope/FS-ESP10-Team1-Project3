// src/controllers/userController.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.getUserById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.getUserByEmail(req.body);
      if (user) {
        res.status(400).json({msg:"el usuario ya existe en la base de datos"});
      } else {
            const { SECRET } = process.env;
            if (!SECRET) {
              throw new Error("JWT SECRET is not defined in environment variables");
            }
            const newUser = await userModel.createUser(req.body);
            const payload = {
              id: newUser.user_id,
              username: newUser.username,
            };
            const token = jwt.sign(payload, SECRET);
            const generateToken = await userModel.generateToken(newUser.user_id, token);
        res.status(201).json({ msg: "usuario creado", token: token });
      }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error)
    }
};
const logIn = async (req, res) => {
    try {
        const userData = await userModel.getUserByEmail(req.body);
        if (userData && req.body.password_hash === userData.password_hash) {
            res.status(200).json({ msg: "login completado"});
          } else {
            res.status(400).json({ msg: "credenciales incorrectas" });
          }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error)
    }
};
module.exports = { getAllUsers, getUser, createUser, logIn };
