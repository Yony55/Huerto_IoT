var express = require('express');
var router = express.Router();
var controller = require('../controllers/plants.controller');

router.get('/plants', controller.plants_list);
router.get('/plants/:idPlant', controller.get_plants);
router.post('/plantspost', controller.insert_plants);

module.exports = router;