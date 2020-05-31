const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const userModel = require('../models/user');
const capitalModel = require('../models/capital');

const capital = {
  autoTransfer : async (req, res) => {
    const { userIdx } = req.body;

    //userIdx값을 입력받았는지 확인
    if(userIdx == undefined){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }

    //입력받은 userIdx가 DB에 존재하는지 확인
    if(await userModel.checkIdx(userIdx) === false){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
      return;
    }

    //자동이체 부분 암호화

    var result = await moneyModel.moneyList(userIdx);
    var beforeAccount = result.account;
    var afterAccount = beforeAccount.split('');
    afterAccount[5] = '*';
    afterAccount[6] = '*';
    afterAccount[7] = '*';
    var printAccount = afterAccount.join('');

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_AUTOTRANSFER_SUCCESS, {
      result
    }));
    return;
  }
}

module.exports = capital;