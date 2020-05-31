const pool = require('../modules/pool');
const userTable = 'user';
const autoTransTable = 'autoTransfer';
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

const capital = {
    autoTransfer: async (userIdx) => {

        //const query = `SELECT * FROM ${userTable} WHERE userIdx = ${userIdx}`;


        const getUserQuery = `SELECT * FROM ${userTable} WHERE userIdx = ${userIdx}`;
        const getNoticeQuery = `SELECT * FROM ${noticeTable} WHERE userIdx = ?`;
        const getAutoTransQuery = `SELECT * FROM ${autoTransTable} WHERE noticeIdx = ?`;

        let newResult = [];

        const getUserResult = await pool.queryParam(getUserQuery);
        console.log("getUser");
        console.log(getUserResult);
        /*if(getUserResult == undefined || getUserResult.length == 0){
            
            throw err;
        }*/

        const getNoticeResult = await pool.queryParamArr(getNoticeQuery, [getUserResult[0].userIdx]);
        console.log("getNotice");
        console.log(getNoticeResult);
        /*if(getNoticeResult == undefined || getNoticeResult.length == 0){
            throw err;
        }*/
        
        //한 유저 당 notice는 날짜별로 여러개 > for문
        for (var i = 0; i < getNoticeResult.length; i++){
            const getAutoTransResult = await pool.queryParamArr(getAutoTransQuery, [getNoticeResult[i].noticeIdx]);
            /*if(getAutoTransResult == undefined || getAutoTransResult.length == 0){
                throw err;
            }*/
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

/*
        //
        //이렇게 하면 date, name, account 나옴
        const query = `SELECT * FROM ${userTable} natural join ${noticeTable} WHERE userIdx = ${userIdx}`;
        //otherUser의 정보를 어떻게 이 정보들이랑 합쳐서 한번에 출력할지 방법 고민중...
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('자동 이체 내역 조회 실패 : ', err);
            throw err;
        }*/
    }
}

module.exports = capital;