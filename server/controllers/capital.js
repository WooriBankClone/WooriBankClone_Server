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

    //결과 부분 아직 안함
    //var result = await moneyModel.moneyList(userIdx);
    //res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_AUTOTRANSFER_SUCCESS, {
    //  result
    //}));
    //return;
  }
}

module.exports = capital;