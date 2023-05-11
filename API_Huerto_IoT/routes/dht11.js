var express = require('express');
var router = express.Router();
var controller = require('../controllers/dht11.controller');

router.get('/dht11', controller.dht11_list);
router.get('/dht11/:idDHT11', controller.get_dht11);
router.post('/dht11post', controller.insert_dht11);

module.exports = router;