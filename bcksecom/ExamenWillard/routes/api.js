const express = require('express');
const router = express.Router();


const restauranteRoutes = require('./restaurante/clientes');

router.use('/clientes',restauranteRoutes);

module.exports = router;
