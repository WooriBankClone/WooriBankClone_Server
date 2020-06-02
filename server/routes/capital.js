var express = require('express');
var router = express.Router();
const capitalController = require('../controllers/capital');

router.post('/', capitalController.autoTransfer);

module.exports = router;