const responseHelper = require("../helper/response-helper");
const bcrypt = require('bcrypt');
const message = require("../helper/message.json");
var validator = require('validator');
const userSchema = require("../models/UserModel")

const register = async(req,res)=>{
    try{
        console.log(req.body.email);
        console.log(req.body.password);
        const email = validator.normalizeEmail(req.body.email);
        console.log(email);
        req.body.password = await bcrypt.hash(req.body.password, 10)
        await userSchema.create(req.body);
        return responseHelper(res, { statusCode: 200, message:message.registrationSuccess["en"] , data: [], error: [] }); 
    }
    catch(e){
        var err = "";
        if (e.message.includes("E11000 duplicate key error collection: test.users index: email_1 dup key")) {
            err="Duplicate email"
          } else {
            err="Some error "
          }
        return responseHelper(res, { statusCode: 400, message:"" , data: [], error: [err] }); 
    }
    
}





module.exports = {register}