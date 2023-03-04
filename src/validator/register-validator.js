const responseHelper = require("../helper/response-helper");
const { niv } = require("../helper/node-input-validator-helper");
const message = require("../helper/message.json");
const cleanBody = require("../helper/clean-body");

const registerCheck = async (req, res, next) => {
    language = "en";
    const validateReq = niv(language, req.body, {
        email: `required|email`,
        password: `required`,
        // confirmPassword: `required|same:password`,
        // referralCode: `sometimes`,
        language: `required|in:en,ru`
    });
    const matched = await validateReq.check();
    if (!matched) {
        responseHelper(res, { statusCode: 400, message: message.invalidRequest[language], data: [], error: validateReq.errors });
    } else {
        const allowed_properties = {
            email: true,
            password: true,
            // confirmPassword: true,
            // referralCode: true,
            // walletAddress: false,
            language: true,
            // nickName: true
        };
        cleanBody.cleanProperties(allowed_properties, req, res, next);
    }
}

module.exports = {registerCheck};