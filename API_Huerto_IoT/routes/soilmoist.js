var express = require('express');
var router = express.Router();
var controller = require('../controllers/soilmoist.controller');

router.get('/soilmoist', controller.soilmoist_list);
router.get('/soilmoist/:idSoilMoistureSensor', controller.get_soilmoist);
router.post('/soilmoistpost', controller.insert_soilmoist);

module.exports = router;