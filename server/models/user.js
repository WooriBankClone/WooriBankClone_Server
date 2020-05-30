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
    moneyList: async (userIdx) => {
        const query = `SELECT * FROM ${moneyListTable} WHERE userIdx = ${userIdx}`;
        try {
            const result = await pool.queryParamArr(query);
            return result;
        } catch (err) {
            console.log('입출금 내역 조회 실패 : ', err);
            throw err;
        }
    }
}

module.exports = user;