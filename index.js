const express = require('express');
const mongoose = require("mongoose");
const config = require("./src/config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((err, req, res, next) => { // Show error screen on invalid request, instead of showing detais about sever
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json( { statusCode: 404, message:'invalid json', data: [], error: [] })
    }
});

app.use(`/${config.api.prefix}`, (req, res) => {
    res.status(200).json({"message":"hello"})
});

mongoose.connect(config.dburl.connectionString,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("connected")
    }
    
})


module.exports = app;
