const pool = require('../modules/pool');
const userTable = 'user';
const moneyListTable = 'moneyList';

const user = {
    checkIdx: async (userIdx) => {
        const query = `SELECT * FROM ${userTable} WHERE userIdx = "${userIdx}"`;    //해당 아이디에 해당하는 모든 데이터
        try{
            const result = await pool.queryParam(query);
            if( result.length === 0 ){  //id에 해당하는 정보가 없다면
                return false;   //false 반환 -> routes/user.js에서 이 결과값으로 userIdx체크
            } else return true; //if문에 걸리지 않았다면 정보가 있다는 의미
        } catch(err){
            console.log('checkUser ERROR: ', err);
            throw err;
        }
    },
    showUser: async (userIdx) => {
        const query = `SELECT * FROM ${userTable} WHERE userIdx = ${userIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            console.log("user 조회 실패 : ",err);
            throw err;
        }
    },
    moneyList: async (userIdx, periodFlag) => {

        let query="";
        const string = "flag, account, other, amount, balance, time, DATE_FORMAT(date,'%Y년 %m월 %d일') AS date, DAYOFWEEK(date) AS weekday";

        //periodFlag값에 따라 정보를 선별해서 가져옴
        if(periodFlag == 1){
            query = `SELECT ${string} FROM ${moneyListTable} WHERE userIdx = ${userIdx} AND DATE(date) > (NOW() - INTERVAL 1 MONTH)`;
        }else if(periodFlag == 3){
            query = `SELECT ${string} FROM ${moneyListTable} WHERE userIdx = ${userIdx} AND DATE(date) > (NOW() - INTERVAL 3 MONTH)`;  
        }else if(periodFlag == 6){
            query = `SELECT ${string} FROM ${moneyListTable} WHERE userIdx = ${userIdx} AND DATE(date) > (NOW() - INTERVAL 6 MONTH)`;
        }else if(periodFlag == 12){
            query = `SELECT ${string} FROM ${moneyListTable} WHERE userIdx = ${userIdx} AND DATE(date) > (NOW() - INTERVAL 1 YEAR)`;
        }

        let getUserQuery = `SELECT * FROM ${userTable} WHERE userIdx = "${userIdx}"`;

        try {
            const userResult = await pool.queryParam(getUserQuery);
            const result = await pool.queryParamArr(query);
            //result for문 돌면서 flag가 1이면, 본인 계좌
            for(var i=0 ; i < result.length ; i++){
                if(result[i].flag == 1){
                    result[i].account = userResult[0].account;
                }

                //DAYOFWEEK(date)값에 따라 요일을 구분해서 date string에 더해줌
                switch(result[i].weekday){
                    case 1 :
                        result[i].weekday = " 일요일";
                        result[i].date += result[i].weekday;
                        break;
                    case 2 :
                        result[i].weekday = " 월요일";
                        result[i].date += result[i].weekday;
                        break;
                    case 3 :
                        result[i].weekday = " 화요일";
                        result[i].date += result[i].weekday;
                        break;
                    case 4 :
                        result[i].weekday = " 수요일";
                        result[i].date += result[i].weekday;
                        break;
                    case 5 :
                        result[i].weekday = " 목요일";
                        result[i].date += result[i].weekday;
                        break;
                    case 6 :
                        result[i].weekday = " 금요일";
                        result[i].date += result[i].weekday;
                        break;
                    case 7 :
                        result[i].weekday = " 토요일";
                        result[i].date += result[i].weekday;
                        break;
                }
                delete result[i].weekday;
            }    
            return result;
        } catch (err) {
            console.log('입출금 내역 조회 실패 : ', err);
            throw err;
        }
    }
}

module.exports = user;