const regService = require("../services/register-service")

const register = async(req,res)=>{
    
   await regService.register(req,res)
    
}

module.exports = {register}