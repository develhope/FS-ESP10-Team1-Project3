// src/app.js
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("../config/db");
const passport = require('../config/passport');
require("dotenv").config();

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'CIz9Kbobqw8rLnaQue5CP-npSp5c_uo19kinIoz04UCifhY5Dgj10LFDFwL5SPag',
  baseURL: 'http://localhost:5000',
  clientID: 'yFef9pGuzjA0JToQEtXhRn5fLXFsCV0a',
  issuerBaseURL: 'https://dev-o72k56frd2psobgl.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Configura CORS primero
//?Conflicto solucionado puerto cors no era compatible con puerto vite.
app.use(
  cors({
    origin: "http://localhost:5175",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Luego, configura otros middleware
app.use(express.json());
app.use(passport.initialize());
// Importa las rutas
const userRoutes = require("../routes/userRoutes");

// Usa las rutas
app.use("/api", userRoutes);

// Añade un manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const createTableFunction = async () => {
  try {
    // Creamos la extensión pgcrypto:
    await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
    console.log("Extensión pgcrypto verificada o creada");

    //  Tabla de usuarios:
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        full_name VARCHAR(50),
        date_of_birth TIMESTAMP NOT NULL,
        token TEXT 
    );
`);
    console.log("Tabla de usuarios verificada o creada");

    //Tabla infoBancaria:
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

    //Tabla skills:
    await pool.query(`
    CREATE TABLE IF NOT EXISTS skills (
        skill_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL
    );
`);

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

    console.log("Tabla Skills verificada o creada");

    // Tabla Projects:
    await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        creator_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        pago numeric(10,2),
        status BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        developer_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
        parent_project_id UUID REFERENCES projects(id) ON DELETE CASCADE  -- (Relación One to Many en la misma tabla)
    );
`);

    // En Postgres, se crea la función update_updated_at_column para actualizar el campo updated_at cada vez que un registro en la tabla projects sea modificado.

    // Los triggers en PostgreSQL son funciones que se ejecutan automáticamente en respuesta a ciertos eventos en una tabla, como INSERT, UPDATE o DELETE.

    // NEW.updated_at establece el valor del campo updated_at al tiempo actual (CURRENT_TIMESTAMP) cada vez que se actualice el registro.

    await pool.query(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()
       RETURNS TRIGGER AS $$
       BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW; -- Esto devuelve el registro modificado
      END;
  $$ LANGUAGE plpgsql;
`);

// Crear el Trigger para Actualizar updated_at

    await pool.query(`
    DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
    CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
   EXECUTE FUNCTION update_updated_at_column();
`);

    console.log("Tabla de proyectos verificada o creada");

    // Tabla services:

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

// createTableFunction();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createTableFunction();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Salir del proceso si hay un error crítico
  }
};
startServer();
