import nodemailer from 'nodemailer'
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, BACKEND_URL, PORT} = process.env;

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS
        }
    });
 
    const { email, nombre, token } = datos;

    // Enviar el email
    await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu Cuenta en BienesRaices.com',
        text: 'Confirma tu Cuenta en BienesRaices.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com</p>

            <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace: 
                <a href="${BACKEND_URL}:${PORT ?? 3000}/auth/confirmar/${token}">Confirma Cuenta</a>
            </p>

            <p>
                Si tu no creaste esta cuenta, puedes ignorar el mensaje
            </p>
        `
    })
}

export {
    emailRegistro
}