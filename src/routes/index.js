const express = require("express");
const api = express.Router();

const v1 = require('./v1');
const responseHelper = require("../helper/response-helper");

api.use('/v1', v1);

api.use('**', (req, res) => {
    return responseHelper(res, { statusCode: 404, message: "Route not found /api/", data: [], error: [] });
});

module.exports = api;