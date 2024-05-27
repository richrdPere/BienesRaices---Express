import express from 'express';
import { 
    formularioLogin, 
    autenticar,
    formularioRegistro, 
    registrar, 
    confirmar, 
    formularioOlvidePasswword,
    resetPassword,
    comprobarToken,
    nuevoPassword
        } from '../controllers/usuarioController.js';

// Routing
const router = express.Router();

router.get('/login', formularioLogin)
router.post('/login', autenticar)

router.get('/registro', formularioRegistro)
router.post('/registro', registrar)

// Endpoint confirmar
router.get('/confirmar/:token', confirmar);

router.get('/olvide-password', formularioOlvidePasswword)
router.post('/olvide-password', resetPassword)

// Añmacena e nuevo password
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);


export default router;