const nodemailer = require('nodemailer');

const confirmEmail = function(email, name, surname, confirmationToken) {
    // Configuración de transporte para nodemailer
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Nombre del servicio de correo (puedes usar otros servicios o configurar SMTP directamente)
        auth: {
            user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
            pass: process.env.EMAIL_PASSWORD // Tu contraseña de correo electrónico
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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo: ' + error);

            // Manejo de error al enviar correo
            res.status(500).json({ error: 'Error al enviar el correo de confirmación.' });
        } else {
            console.log('Correo de confirmación enviado: ' + info.response);

            // Éxito
            res.json({ message: 'Correo de confirmación enviado.' });
        }
    });
};

module.exports = { confirmEmail };