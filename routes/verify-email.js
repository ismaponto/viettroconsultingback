const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');

const router = express.Router();

router.get('/:emailConfirmationToken', async(req, res) => {
    const emailConfirmationToken = req.params.emailConfirmationToken;

    try {
        // Obtener el usuario por su correo electrónico y token de confirmación
        const user = await User.findOne({
            emailConfirmationToken: emailConfirmationToken,
            isEmailConfirmed: false
        });
        if (user) {

            // Actualizar el campo isEmailConfirmed a true
            user.isEmailConfirmed = true;
            // Limpiar el token de confirmación solo si existe
            if (user.emailConfirmationToken) {
                user.emailConfirmationToken = 'validado';
            }

            // Guardar los cambios en el usuario
            await user.save();
            res.send('Email confirmado exitosamente.');
        } else {
            res.status(400).send('Token inválido o usuario no encontrado.');
        }
    } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
        res.status(500).send('Error al verificar el correo electrónico.');
    }
});

module.exports = router;