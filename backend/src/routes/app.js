// src/app.js
const express = require("express");
const cors = require("cors");
const { auth, requiresAuth } = require('express-openid-connect');
const pool = require("../config/db");
const passport = require('../config/passport');
require("dotenv").config();
const path = require('path'); // Importa path

const app = express();

// Configuración de Auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET || 'bIHBGZi2mYZP43bxOrK6_0FY55C5buoC1I7XzBAr5t5C5YGMXGr1N2Jfrt8DZpOV',
  baseURL: 'http://localhost:5000',
  clientID: 'KpqssnSz2CKBQtk7ZWESKzPdYr1j3hQS',
  issuerBaseURL: 'https://dev-3erzjdx3zx5m21bh.us.auth0.com'
};

// Configuración de Auth0 en Express
app.use(auth(config));

// Ruta para verificar si el usuario está autenticado
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Ruta para obtener el perfil del usuario autenticado con Auth0 y el token JWT
app.get('/profile', requiresAuth(), (req, res) => {
  const namespace = 'https://freelancehub.custom/';

  // Extraemos los datos personalizados del token JWT generado por Auth0
  const userProfile = {
    user_id: req.oidc.user[`${namespace}user_id`],       // ID del usuario
    full_name: req.oidc.user[`${namespace}full_name`],   // Nombre completo
    date_of_birth: req.oidc.user[`${namespace}date_of_birth`], // Fecha de nacimiento
    email: req.oidc.user.email  // Email del usuario (dato estándar de Auth0)
  };

  // Devolver el perfil del usuario junto con el token JWT
  res.status(200).json({
    ...userProfile,
    token: req.oidc.idToken // Incluimos el token JWT en la respuesta
  });
});

// Configura CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Luego, configura otros middleware
app.use(express.json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Importa las rutas
const userRoutes = require("../routes/userRoutes");

// Usa las rutas
app.use("/api", userRoutes);

// Para todas las demás rutas, devolver el index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

// Añade un manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Función para crear tablas y manejar la base de datos
const createTableFunction = async () => {
  try {
    // Creamos la extensión pgcrypto
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    console.log("Extensión pgcrypto verificada o creada");

    // Crear o verificar tablas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        full_name VARCHAR(50),
        date_of_birth TIMESTAMP NOT NULL,
        token TEXT,
        linkportfolio TEXT
      );
    `);
    console.log("Tabla de usuarios verificada o creada");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS infoBancaria (
        propietario UUID,
        titular VARCHAR(100), 
        numero_cuenta VARCHAR(100),
        pais VARCHAR(50),
        moneda VARCHAR(25),
        seleccionada BOOLEAN DEFAULT FALSE,
        PRIMARY KEY (propietario, numero_cuenta),
        FOREIGN KEY (propietario) REFERENCES users(user_id)
      );
    `);
    console.log("Tabla de infobancaria verificada o creada");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS skills (
        skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name varchar(50)
      );
    `);
    await pool.query(`
      INSERT INTO skills (skill_id, name) 
      VALUES 
        ('5a3b7417-6443-4913-b411-f2b9bb7b8547', 'javascript'),
        ('711913a3-5cfa-4161-b472-0832a9e45f9b', 'react'),
        ('6a99e676-17b8-4c0d-af01-b307ca4ba7a0', 'typescript'),
        ('d88975ac-bba5-4b70-b251-609bdfc14219', 'node'),
        ('b45078a8-4617-4b7c-8f44-cebb5f3ad483', 'java'),
        ('09613d15-2d56-48dc-b3d2-b9aaf06cd1b4', 'python'),
        ('8d81ac2f-9301-4e4c-af5e-2ff2a368b442', 'C++'),
        ('3354a77a-d74f-41a7-a395-8bdfa2f30cfb', 'HTML'),
        ('f01b96f6-e471-41cd-b904-6006d54b9554', 'CSS'),
        ('f2092891-1e26-4658-9845-c0a34e47d15f', 'SQL'),
        ('01df5a25-cc46-41c7-b58f-17c59249fabf', 'MongoDB'),
        ('d04246f0-d26d-4078-a624-f05119f6367b', 'Git'),
        ('4aba52d1-e730-4f39-864a-6689eb2b77e2', 'Docker'),
        ('a6abcd2f-661a-418a-8eb0-0895ed1e4f9b', 'AWS'),
        ('a8e38141-60bc-4d44-8702-74062d52099b', 'Azure')
      ON CONFLICT (skill_id) DO NOTHING;
    `);
    console.log("Tabla Skills verificada o creada");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_skills (
        user_id UUID,
        skill_id UUID,
        PRIMARY KEY (user_id, skill_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
      );
    `);
    console.log("Tabla user_skills verificada o creada");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        creator_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        pago numeric(10,2),
        status BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deadline DATE,
        developer_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
        parent_project_id UUID REFERENCES projects(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = CURRENT_TIMESTAMP;
          RETURN NEW;
        END;
      $$ LANGUAGE plpgsql;
    `);

    await pool.query(`
      DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
      CREATE TRIGGER update_projects_updated_at
      BEFORE UPDATE ON projects
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log("Tabla de proyectos verificada o creada");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        creator_id UUID,
        titulo varchar(50),
        pago numeric(10,2),
        descripcion varchar(1000),
        imagen_path TEXT,
        categoria varchar(50),
        FOREIGN KEY (creator_id) REFERENCES users(user_id)
      );
    `);

    console.log("Tabla de servicios verificada o creada");
  } catch (error) {
    console.error("Error al crear las tablas o la extensión:", error);
  }
};

// Iniciar el servidor
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createTableFunction();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
};
startServer();
