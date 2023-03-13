const express = require("express");
const api = express.Router();
const {refreshTokenValidation} = require("../../validator/token-validator")
const {verifyToken} = require("../../middleware/token-middleware")

const responseHelper = require("../../helper/response-helper");

const {login, createToken} = require("../../controllers/login-controller");

const {loginCheck} = require("../../validator/login-validator");
// const tokenMiddleware = require("../../middleware/token-middleware");
// const responseHelper = require("../../helper/response-helper");

api.post("/", loginCheck, login); //

api.post("/get-new-access-token", refreshTokenValidation,verifyToken, createToken);

api.use('**', (req, res) => {
    return responseHelper(res, { statusCode: 404, message: "Route not found /api/v1/login", data: [], error: [] });
});

module.exports = api;