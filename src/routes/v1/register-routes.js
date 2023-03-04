const express = require("express");
const api = express.Router();

const responseHelper = require("../../helper/response-helper");
const registerController =require("../../controllers/register-controller")
const registerValidation = require("../../validator/register-validator")


// const loginController = require("../../controller/login-controller");
// const tokenValidation = require("../../validator/token-verification-validation");
// const loginValidation = require("../../validator/login-validation");
// const tokenMiddleware = require("../../middleware/token-middleware");
// const responseHelper = require("../../helper/response-helper");

api.post("/",registerValidation.registerCheck,registerController.register);

// api.post("/get-new-access-token", tokenValidation.requestBodyValidation, tokenValidation.refreshTokenHeaderValidation, tokenMiddleware.verifyToken, loginController.createNewTokenPattern);

api.use('**', (req, res) => {
    return responseHelper(res, { statusCode: 404, message: "Route not found /api/v1/register", data: [], error: [] });
});

module.exports = api;