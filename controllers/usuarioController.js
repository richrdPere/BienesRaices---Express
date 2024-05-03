import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js';
import { generarId } from '../helpers/tokens.js';

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
    await Usuario.create({
        nombre, 
        email, 
        password,
        token: generarId()
    })

    // Mostrar mensaje de confirmación
    res.render('templates/mensaje', {
        pagina: 'Cuenta Creada Correctamente',
        mensaje: "Hemos enviado un Email de Confirmación, presione en el enlace"
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
    formularioOlvidePasswword
}