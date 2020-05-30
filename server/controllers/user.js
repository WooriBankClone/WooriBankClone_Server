const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const userModel = require('../models/user');

const user = {
  showUser : async (req, res) => {
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

    //입력받은 userIdx로 필요한 정보 가져와서 출력
    var result = await userModel.showUser(userIdx);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_USER_SUCCESS, {
      account : result[0].account,
      balance : result[0].balance
    }));
    return;
  },

  moneyList : async (req, res) => {
    const { userIdx } = req.body;

    //userIdx값을 입력받았는지 확인
    if(userIdx == undefined){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
      return;
    }
    
    //입력받은 userIdx가 DB에 존재하는지 확인
    if(await userModel.checkIdx(userIdx) == false){
      res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
      return;
    }

    //입력받은 userIdx로 필요한 정보 가져와서 출력
    var result = await userModel.moneyList(userIdx);
    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_TRANSACTION_SUCCESS, {
      result
    }));
    return;
  }
}

module.exports = user;