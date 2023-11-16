const express = require('express');
const router = express.Router();
const { jsonResponse } = require('../lib/jsonResponse.js');
const User = require('../schema/user.js');

function isSafePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
    return regex.test(password);
}

function isEmail(cadena) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)+$/;
    return regex.test(cadena);
}


router.post('/', async(req, res) => {
    const { email, name, surname, password } = req.body;

    if (!!!email || !!!name || !!!surname || !!!password) {
        return res.status(400).json(jsonResponse(400, { error: 'All fields are required' }));
    }
    if (!isSafePassword(password)) {
        return res.status(400).json(jsonResponse(400, { error: 'La contraseña no es segura' }));
    }
    if (!isEmail(email)) {
        res.status(400).json(jsonResponse(400, { error: 'El usuario debe ser un email' }))
    }

    try {
        const userExists = await User.userExists(email);

        if (userExists) {
            return res.status(400).json(jsonResponse(400, { error: 'Email already in use' }));
        }

        const newUser = new User({ email, name, surname, password });

        await newUser.save();
        return res.status(200).json(jsonResponse(200, { message: 'User created successfully' }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonResponse(500, { error: 'Internal Server Error' }));
    }
});

module.exports = router;