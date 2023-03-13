const loginService = require("../services/login-service")

const login = async(req,res)=>{
   await loginService.login(req,res)    
}

const createToken=async(req,res)=>{
    await loginService.createNewAccessToken(req, res)
}

module.exports = {login, createToken}