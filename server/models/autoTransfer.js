const pool = require('../modules/pool');
const table = 'autoTransfer';

/*
형태 참고
"status": 200,
    "success": true,
    "message": "입출금 정보 출력 성공",
    "data" : [
        {
        "date" : "2020년 05월 16일 토요일",
        "flag" : 0,
        "dueDate" : "2020.02.04",
        "userName" : "이희수",
        "userAccount" : "43553-**-***902",
        "otherName" : "김형호",
        "otherAccount" : "016-21-0***",
        "content" : "월세"

    }
*/

const user = {
    autoTransfer: async (userIdx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx = ${userIdx}`;
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