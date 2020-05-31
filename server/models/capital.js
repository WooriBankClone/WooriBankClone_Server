const pool = require('../modules/pool');
const userTable = 'user';
const autoTransTable = 'autoTransfer';
const noticeTable = 'notice';

const capital = {
    autoTransfer: async (userIdx) => {

        const getUserQuery = `SELECT * FROM ${userTable} WHERE userIdx = ${userIdx}`;
        const getNoticeQuery = `SELECT * FROM ${noticeTable} WHERE userIdx = ?`;
        const getAutoTransQuery = `SELECT * FROM ${autoTransTable} WHERE noticeIdx = ?`;

        let newResult = [];

        try {
            const getUserResult = await pool.queryParam(getUserQuery);
            const getNoticeResult = await pool.queryParamArr(getNoticeQuery, [getUserResult[0].userIdx]);
    
            //한 유저 당 notice는 날짜별로 여러개 > for문
            for (var i = 0; i < getNoticeResult.length; i++){
                const getAutoTransResult = await pool.queryParamArr(getAutoTransQuery, [getNoticeResult[i].noticeIdx]);
    
                //notice 한 날짜에 내역 여러개 > for문
                for (var j = 0; j < getAutoTransResult.length; j++){
                    let addResult = {};
                    addResult.date = getNoticeResult[i].date;
                    addResult.userName = getUserResult[0].name;
                    addResult.userAccount = getUserResult[0].account;
                    addResult.otherName = getAutoTransResult[j].otherName;
                    addResult.otherAccount = getAutoTransResult[j].otherAccount;
                    addResult.flag = getAutoTransResult[j].flag;
                    addResult.dueDate = getAutoTransResult[j].dueDate;
                    addResult.content = getAutoTransResult[j].content;
                    newResult.push(addResult);
                }
            }
            return newResult;
        } catch (error) {
            console.log('자동이체 내역 조회 실패 : ', err);
            throw err;
        }
    }
}

module.exports = capital;