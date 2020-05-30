const pool = require('../modules/pool');
const table = 'user';

const user = {
    showUser: async (userIdx) => {
        const query = `SELECT * FROM ${table} WHERE userIdx = ${userIdx}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            console.log("user 조회 실패 : ",err);
            throw err;
        }
    }
}

module.exports = user;