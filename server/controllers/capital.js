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

    let result = await capitalModel.autoTransfer(userIdx);

    
    //자동이체 부분 암호화
    for(var i = 0 ; i < result.length ; i++){
      var afterAccount1 = result[i].userAccount.split('-');
      let star = "";
      for(var j = 0 ; j < afterAccount1[1].length ; j ++){ star += "*";}
      afterAccount1[1] = afterAccount1[1].replace(afterAccount1[1],star);

      var afterAccount2 = result[i].otherAccount.split('-');
      star = "";
      for(var j = 0 ; j < afterAccount2[1].length ; j ++){ star += "*";}
      afterAccount2[1] = afterAccount2[1].replace(afterAccount2[1],star);

      result[i].userAccount = afterAccount1.join('-');
      result[i].otherAccount = afterAccount2.join('-');
    }


    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_AUTOTRANSFER_SUCCESS,
      result
    ));
    return;
  }
}

module.exports = capital;