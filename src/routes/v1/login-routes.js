const express = require("express");
const api = express.Router();

const responseHelper = require("../../helper/response-helper");

// const loginController = require("../../controller/login-controller");
// const tokenValidation = require("../../validator/token-verification-validation");
// const loginValidation = require("../../validator/login-validation");
// const tokenMiddleware = require("../../middleware/token-middleware");
// const responseHelper = require("../../helper/response-helper");

// api.post("/", loginValidation.loginRequestValidation, loginController.login);

// api.post("/get-new-access-token", tokenValidation.requestBodyValidation, tokenValidation.refreshTokenHeaderValidation, tokenMiddleware.verifyToken, loginController.createNewTokenPattern);

api.use('**', (req, res) => {
    return responseHelper(res, { statusCode: 404, message: "Route not found /api/v1/login", data: [], error: [] });
});

module.exports = api;