const pool = require('../modules/pool');
const userTable = 'user';
const moneyListTable = 'moneyList';

const user = {
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