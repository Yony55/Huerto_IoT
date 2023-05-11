var express = require('express');
var router = express.Router();

// HTTP
// GET    Obtener info
// POST   Registrar
// PUT    Actalizar
// DELETE

router.get('/', (request, response) => {
    response.send('Página inicio');
});

module.exports = router;