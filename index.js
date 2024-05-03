//const express = require('express');
import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) )

// Conexion a la Base de Datos
try {
    await db.authenticate();
    db.sync();
    console.log("Conexión Correcta a la Base de datos")
} catch(error){
    console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Publica
app.use( express.static('public'));

// Routing
app.use('/auth', usuarioRoutes);

// Definir un puerto y arrancarlo
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`El Servidor esta funcionando en el puerto ${PORT}`)
});
