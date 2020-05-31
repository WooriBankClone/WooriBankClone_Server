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

    /*자동이체 부분 암호화
    var beforeAccount = '0000-123-111111';     //기존 문자열
    var afterAccount = userAccount.split('');   //한 글자씩 쪼개기
    afterAccount[5] = '*';  //특정 자릿수 *로 바꾸기
    afterAccount[6] = '*';
    afterAccount[7] = '*';
    var printAccount = beforeAccount.join('');     //배열의 모든 원소를 하나의 문자열로 합치기
    console.log(printAccount);    //변경된 문자열 출력
    */

    //var result = await moneyModel.moneyList(userIdx);
    //res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_AUTOTRANSFER_SUCCESS, {
    //  result
    //}));
    //return;
  }
}

module.exports = capital;