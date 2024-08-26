// src/app.js
const express = require('express');
const cors = require('cors');
const app = express();
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});