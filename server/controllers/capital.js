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
      console.log(afterAccount1);
      afterAccount1[1].replace(afterAccount1[1],'**');
      var afterAccount2 = result[i].otherAccount.split('-');
      afterAccount2[1].replace(afterAccount2[1],"*");
      result[i].userAccount = afterAccount1.join('-');
      result[i].otherAccount = afterAccount2.join('-');
    }


    res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_AUTOTRANSFER_SUCCESS,
      result
      /*
      "date" : result.date,
      "userName" : result.userName,
      "userAccount" : printAccount1,
      "otherName" : result.otherName,
      "otherAccount" : printAccount2,
      "flag" : result.flag,
      "dueDate" : result.dueDate,
      "content" : result.content*/
    ));
    return;
  }
}

module.exports = capital;