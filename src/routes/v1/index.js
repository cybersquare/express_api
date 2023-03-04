const express = require("express");
const api = express.Router();

const loginRoute = require('./login-routes');
const registerRoute = require('./register-routes');
const responseHelper = require("../../helper/response-helper");

api.use('/login', loginRoute);
api.use('/register', registerRoute);

api.use('**', (req, res) => {
    return responseHelper(res, { statusCode: 404, message: "Route not found /api/route", data: [], error: [] });
});

module.exports = api;