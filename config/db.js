import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config({path: ".env"});

const db = new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASSWORD ?? "", {
    host: process.env.BD_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
        timestamps: true
    },
    pool: {
        max: 5, // Maximo de conexiones.
        min: 0, // Minimo de conexiones.
        acquire: 30000, // 30 segundos. Tiempo de espera antes de marcar un error.
        idle: 10000 // 10 segundos. Tiempo que debe esperar para finalizar la conexion.
    },
    operatorAliases: false
});

export default db;