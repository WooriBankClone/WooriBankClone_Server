const pool = require('../modules/pool');
const userTable = 'user';
const moneyListTable = 'moneyList';
const noticeTable = 'notice';

/*
형태 참고
"status": 200,
    "success": true,
    "message": "자동이체 정보 출력 성공",
    "data" : [
        {
        "date" : "2020년 05월 16일 토요일", notice - date

        "userName" : "이희수", user - name
        "userAccount" : "43553-**-***902", user - account

        "otherName" : "김형호", user - name2
        "otherAccount" : "016-21-0***", user - account2

        "flag" : 0, autoTransfer - flag
        "dueDate" : "2020.02.04", autoTransfer - dueDate 
        "content" : "월세" autoTransfer - content
    }
*/

const user = {
    autoTransfer: async (userIdx) => {
        const query = `SELECT * FROM ${userTable} natural join ${noticeTable} WHERE userIdx = ${userIdx}`;  //이렇게 하면 date, name, account 나옴
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('자동 이체 내역 조회 실패 : ', err);
            throw err;
        }
    }
}

module.exports = user;