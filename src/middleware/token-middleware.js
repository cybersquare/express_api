const jwt = require('jsonwebtoken');
const responseHelper = require("../helper/response-helper");
const config = require("../config")

async function createTokenPair(userInfo){
    const accessToken = jwt.sign({exp:1,data: userInfo}, 'accessSecrect');
    const refreshToken = jwt.sign({exp:Math.floor(Date.now() / 1000) + (60 * 60),data: userInfo}, config.refreshSecret);
    return {accessToken, refreshToken}
}

async function verifyToken(req, res, next){
    try{
        const isTokenValid = jwt.verify(req.headers.refreshtoken,config.refreshSecret);
       console.log("isTokenVald", isTokenValid.data.userId)
        if(isTokenValid==null){
            return responseHelper(res, { statusCode: 401, message: "Unauthorized access", data: [], error: [] });
        }
        else{

            req.userId = isTokenValid.data.userId
            console.log("Userid from verify token", isTokenValid.userId)
            req.email = isTokenValid.data.email
            next()
        }
    }
    catch(e){
        return responseHelper(res, { statusCode: 402, message: "Unauthorized access", data: [], error: [] });
    }
}


module.exports = {createTokenPair, verifyToken}