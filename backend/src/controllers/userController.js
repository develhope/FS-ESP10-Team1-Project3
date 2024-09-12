// src/controllers/userController.js
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, password_hash } = req.body;
    const user = await userModel.getUserByEmail(req.body);
    if (user) {
      res.status(400).json({ msg: "el usuario ya existe en la base de datos" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password_hash, salt);
      const newUser = await userModel.createUser({
        ...req.body,
        password_hash: hashedPassword,
      });

      const { SECRET } = process.env;
      if (!SECRET) {
        throw new Error("JWT SECRET is not defined in environment variables");
      }
      const payload = {
        id: newUser.user_id,
        full_name: newUser.full_name,
      };
      const token = jwt.sign(payload, SECRET);
      const generateToken = await userModel.generateToken(
        newUser.user_id,
        token
      );
      res.status(201).json({ msg: "usuario creado", token: token });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Verificar si el usuario ya existe
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ msg: 'El correo ya está registrado.' });
//         }

//         // Hash de la contraseña
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Crear nuevo usuario
//         const newUser = new User({
//             email,
//             password: hashedPassword
//         });

//         await newUser.save();

//         res.status(201).json({ msg: 'Usuario registrado exitosamente' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'Error del servidor' });
//     }
// });
const logIn = async (req, res) => {
  try {
    const userData = await userModel.getUserByEmail(req.body);
    if (!userData) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    const passwordCompare = await bcrypt.compare(
      req.body.password_hash,
      userData.password_hash
    );
    if (passwordCompare) {
      const { SECRET } = process.env;
      if (!SECRET) {
        throw new Error("JWT SECRET is not defined in environment variables");
      }
      const payload = {
        id: userData.user_id,
        full_name: userData.full_name,
      };
      const token = jwt.sign(payload, SECRET);
      const generateToken = await userModel.generateToken(
        userData.user_id,
        token
      );
      res
        .status(200)
        .json({
          full_name: userData.full_name,
          token: token,
          email: userData.email,
          // password_hash: userData.password_hash,
          user_id: userData.user_id,
          full_name: userData.full_name,
          date_of_birth: userData.date_of_birth,
          
        });
    } else {
      res.status(400).json({ msg: "credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const checkIfLoged = async (req, res) => {
  try {
    const userToken = await userModel.checkToken(req.body.token);
    if (userToken) {
      res.status(200).json({ loggedIn: true }); // Si el token se encuentra en la base de datos, devuelve true
    } else {
      res.status(401).json({ loggedIn: false }); // Si no se encuentra, devuelve false
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const logOut = async (req, res) => {
  try {
    const result = await userModel.deleteToken(req.body.token);

    if (result) {
      res.status(200).json({ message: "Successfully logged out" });
    } else {
      res.status(404).json({ error: "Token not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const result = await userModel.deleteUser(req.body.email);

    if (result) {
      res.status(200).json({ message: "Successfully deleted" });
    } else {
      res.status(404).json({ error: "delete didnt work" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  logIn,
  checkIfLoged,
  logOut,
  deleteUser,
};
