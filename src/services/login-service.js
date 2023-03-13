const responseHelper = require("../helper/response-helper");
const bcrypt = require('bcrypt');
const message = require("../helper/message.json");
var validator = require('validator');
const userSchema = require("../models/UserModel")
const {createTokenPair} = require("../middleware/token-middleware")
const mongoose = require("mongoose")

const login = async(req,res)=>{
    try{
        const email = validator.normalizeEmail(req.body.email);
        const password = req.body.password;
        console.log(req.body.email);
        console.log("Email is "  , email);
        console.log(req.body.password);
        const userFound = await userSchema.findOne({email},{password:1} );
        console.log(userFound)
        if(userFound){
            const isPasswordMatch =await bcrypt.compare(password, userFound.password)
            if(isPasswordMatch){
                const tokens = await createTokenPair({email, userId: userFound._id});
                await userSchema.findOneAndUpdate(userFound._id, {$set:{refreshToken: tokens.refreshToken}})
                return responseHelper(res, { statusCode: 200, message:message.loginSuccess["en"] , data:tokens, error: [] }); 
            }
            return responseHelper(res, { statusCode: 400, message:message.loginFailed["en"] , data: [], error: [] });   
        }
        else{
            return responseHelper(res, { statusCode: 400, message:message.loginFailed["en"] , data: [], error: [] }); 
            
        }
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

const createNewAccessToken = async (req, res)=>{
    console.log("User ID", req.userId)
    const isFound = await userSchema.findOne({_id:mongoose.Types.ObjectId(req.userId),refreshToken:req.headers.refreshtoken},{refreshToken:1,email:1})
        if(isFound){
            const tokens= await createTokenPair({email:isFound.email,userId:isFound._id});

            await userSchema.findOneAndUpdate(isFound._id, {$set:{refreshToken: tokens.refreshToken}})
            return responseHelper(res, { statusCode: 200, message:"New refresh token generated" , data:tokens, error: [] }); 
        
        }
        else{
            return responseHelper(res, { statusCode: 400, message:"Invalid refresh token" , data: [], error: [] }); 
        }
    }

module.exports = {login, createNewAccessToken}