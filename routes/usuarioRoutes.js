import express from 'express';
import { formularioLogin, formularioRegistro, registrar, confirmar, formularioOlvidePasswword } from '../controllers/usuarioController.js';

// Routing
const router = express.Router();

router.get('/login', formularioLogin)

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

router.get('/olvide-password', formularioOlvidePasswword)

// Endpoint confirmar
router.get('/confirmar/:token', confirmar);
    

export default router;