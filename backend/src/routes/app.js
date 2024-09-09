// src/app.js
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("../config/db");
require("dotenv").config();

// Configura CORS primero
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Luego, configura otros middleware
app.use(express.json());

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

    console.log("Tabla Skills verificada o creada");

    // Tabla Projects:
    await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY,
        creator_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        status BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        developer_id UUID REFERENCES users(user_id) ON DELETE SET NULL
    );
`);

    console.log("Tabla de proyectos verificada o creada");

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
