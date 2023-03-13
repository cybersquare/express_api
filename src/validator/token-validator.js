const responseHelper = require("../helper/response-helper");
const { niv } = require("../helper/node-input-validator-helper");
const message = require("../helper/message.json");

const refreshTokenValidation = async (req, res, next) => {
    language = "en";
    const validateReq = niv(language, req.headers, {
        refreshtoken: `required`
    });
    const matched = await validateReq.check();
    if (!matched) {
        responseHelper(res, { statusCode: 400, message: message.invalidRequest[language], data: [], error: validateReq.errors });
    } 
    else{
        next()
    }
}

module.exports = {refreshTokenValidation};