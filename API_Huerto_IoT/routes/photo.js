var express = require('express');
var router = express.Router();
var controller = require('../controllers/photo.controller');

router.get('/photo', controller.photo_list);
router.get('/photo/:idPhotoresistor', controller.get_photo);
router.post('/photopost', controller.insert_photo);

module.exports = router;