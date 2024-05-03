import express from 'express';
import { formularioLogin, formularioRegistro, registrar, formularioOlvidePasswword } from '../controllers/usuarioController.js';

// Routing
const router = express.Router();

router.get('/login', formularioLogin)

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

router.get('/olvide-password', formularioOlvidePasswword)

    

export default router;