//const express = require('express');
import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from './routes/usuarioRoutes.js';
import db from './config/db.js';

// Process.env
//const { PORT } = process.env;

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use( express.urlencoded({extended: true}) )

// Habilitar Cookie Parser
app.use( cookieParser() );

// Habilitar el CSRF
app.use( csrf({cookie: true}))
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
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`El Servidor esta funcionando en el puerto ${PORT}`)
});
