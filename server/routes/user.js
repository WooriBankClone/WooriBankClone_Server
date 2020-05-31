var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.showUser);
router.get('/moneyList', userController.moneyList);

module.exports = router;