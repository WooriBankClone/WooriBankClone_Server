const pool = require('../modules/pool');
const table = 'moneyList';

const user = {
    moneyList: async (userIdx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx = ${userIdx}`;
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