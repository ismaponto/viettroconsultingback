const nodemailer = require('nodemailer');

const confirmEmail = function(email, name, surname, confirmationToken) {
    // Configuración de transporte para nodemailer (puedes ajustarla según tus necesidades)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Contenido del correo electrónico
    const mailOptions = {
        from: process.env.EMAIL_ACCOUNT,
        to: email,
        subject: 'Confirmación de correo electrónico',
        text: `Hola ${name} ${surname},\n\n` +
            'Por favor, haz clic en el siguiente enlace para confirmar tu correo electrónico:\n' +
            `https://viettroback.onrender.com/api/verify-email/${confirmationToken}\n\n` +
            '¡Gracias!' +
            'Si usted no se ha suscrito en la pagina web de Viettro Consulting, por favor ignore este mensaje'
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error al enviar el correo electrónico:', error);
        } else {
            console.log('Correo electrónico enviado:', info.response);
        }
    });
};