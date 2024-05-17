import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/emails.js'

const formularioLogin = (req, res) => {
    res.render('auth/login', {
        pagina: "Iniciar Sesion"
    })
}

const formularioRegistro = (req, res) => {
    res.render('auth/registro', {
        pagina: "Crear Cuenta"
    })
}
const registrar = async (req, res) => {

    //return res.json(req.body);
    // Validacion
    await check('nombre').notEmpty().withMessage('El Nombre no puede ir vacio').run(req)
    await check('email').isEmail().withMessage('Eso no parece un Email').run(req)
    await check('password').isLength({ min: 6 }).withMessage('El Password debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Los Passwords no son iguales').run(req)

    let resultado = validationResult(req);

    //return res.json(resultado.array());
    
    // Verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        // Errores
        return res.render("auth/registro", {
            pagina: 'Crear Cuenta',
            errores: resultado.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    // Extraer los datos
    const { nombre, email, password } = req.body;

    // Verificar que el Usuario no este duplicado
    const existeUsuario = await Usuario.findOne({
        where: {email}
    })

    if(existeUsuario){
        // Si existe
        return res.render("auth/registro", {
            pagina: 'Crear Cuenta',
            errores: [{msg: 'El Usuario ya esta Registrado'}],
            usuario: {
                nombre: nombre,
                email: email
            }
        })
    }

    // Almacenar un Usuario
    const usuario = await Usuario.create({
        nombre, 
        email, 
        password,
        token: generarId()
    })

    // Enviar email de confirmación
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    // Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: "Hemos enviado un Email de Confirmación, presione en el enlace"
    })

}

// Funcion qu ecomprueba una cuenta 
const confirmar = async (req, res) => {
    const { token } = req.params;

    // Verificar si el token es válido
    const usuario = await Usuario.findOne({
        where: {token}
    })

    if(!usuario){
        return res.render('auth/confirmar-cuenta', {
            pagina: 'Error al confirmar tu cuenta',
            mensaje: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
            error: true
        })
    }
    
    // Confirmar la cuenta
    usuario.token = null;
    usuario.confirmado = true;
    await usuario.save();

    return res.render('auth/confirmar-cuenta', {
        pagina: 'Cuenta Confirmada',
        mensaje: 'La cuenta se confirmó Correctamente',
    })

}

const formularioOlvidePasswword = (req, res) => {
    res.render('auth/olvide-password', {
        pagina: "Recupera tu acceso a Bienes Raices"
    })
}



export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioOlvidePasswword

}