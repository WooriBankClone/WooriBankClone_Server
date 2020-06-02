var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.showUser);
router.post('/moneyList', userController.moneyList);

module.exports = router;