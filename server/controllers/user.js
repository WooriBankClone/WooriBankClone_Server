const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const userModel = require('../models/user');
const moneyModel = require('../models/moneyList');

const user = {
  showUser : async (req, res) => {
    const { userIdx } = req.body;
    var result = await userModel.showUser(userIdx);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_USER_SUCCESS, {
      account : result[0].account,
      balance : result[0].balance
    }));
    return;
  },

  moneyList : async (req, res) => {
    const { userIdx } = req.body;
    var result = await moneyModel.moneyList(userIdx);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_TRANSACTION_SUCCESS, {
      result
    }));
    return;
  }
}

module.exports = user;