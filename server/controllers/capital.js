const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
//const PostModel = require('../models/post');

const capital = {
    autoTransfer : async (req, res) => {
      const { userIdx } = req.body;
      var result = await moneyModel.moneyList(userIdx);
      res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_AUTOTRANSFER_SUCCESS, {
        result
      }));
      return;
    }
}

module.exports = capital;