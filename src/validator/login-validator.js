const responseHelper = require("../helper/response-helper");
const { niv } = require("../helper/node-input-validator-helper");
const message = require("../helper/message.json");
const cleanBody = require("../helper/clean-body");

const loginCheck = async (req, res, next) => {
    language = "en";
    const validateReq = niv(language, req.body, {
        email: `required|email`,
        password: `required`,
        language: `required|in:en,ru`
    });
    const matched = await validateReq.check();
    if (!matched) {
        responseHelper(res, { statusCode: 400, message: message.invalidRequest[language], data: [], error: validateReq.errors });
    } else {
        const allowed_properties = {
            email: true,
            password: true,
            language: true,
        };
        cleanBody.cleanProperties(allowed_properties, req, res, next);
    }
}

module.exports = {loginCheck};