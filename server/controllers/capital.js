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

    var result = await moneyModel.moneyList(userIdx);

    //자동이체 부분 암호화
    var beforeAccount1 = result.userAccount;
    var beforeAccount2 = result.otherAccount;
    var afterAccount1 = beforeAccount1.split('');
    var afterAccount2 = beforeAccount3.split('');
    afterAccount1[5] = '*';
    afterAccount1[6] = '*';
    afterAccount1[7] = '*';
    afterAccount2[5] = '*';
    afterAccount2[6] = '*';
    afterAccount2[7] = '*';
    var printAccount1 = afterAccount1.join('');
    var printAccount2 = afterAccount2.join('');

    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_AUTOTRANSFER_SUCCESS, {
      "date" : result.date,
      "userName" : result.userName,
      "userAccount" : printAccount1,
      "otherName" : result.otherName,
      "otherAccount" : afterAccount2,
      "flag" : result.flag,
      "dueDate" : result.dueDate,
      "content" : result.content
    }));
    return;
  }
}

module.exports = capital;