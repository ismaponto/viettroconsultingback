const express = require("express");
const { jsonResponse } = require("../lib/jsonresponse");
const router = express.Router();
const User = require('../schema/user.js');

router.get("/", async function(req, res, next) {
    try {
        // En este punto, `req.user` contiene la información del usuario autenticado
        const user = req.user.email
        res.json(jsonResponse(200, user));
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, { error: 'Error interno del servidor' }));
    }
});

module.exports = router;