// src/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('../config/db');
require('dotenv').config();

// Configura CORS primero
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Luego, configura otros middleware
app.use(express.json());

// Importa las rutas
const userRoutes = require('../routes/userRoutes');

// Usa las rutas
app.use('/api', userRoutes);

// Añade un manejador de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const createUsersTable = async () => {
    await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
         create table IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email varchar(100) not null unique,
    password_hash TEXT not null,
    full_name varchar(50),
    date_of_birth timestamp not null,
    token TEXT 
)`);
    console.log('Tabla de usuarios verificada o creada');
};
createUsersTable();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        await createUsersTable();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1); // Salir del proceso si hay un error crítico
    }
};
startServer();
