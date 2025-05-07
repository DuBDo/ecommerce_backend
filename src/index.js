//npm joi
//password hashing in model or schema


const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config();

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database Connected");
    new Promise((resolve)=>{
        app.listen(port, ()=>{
            console.log('Server is listening');
            resolve();
        })
    })
}).catch((err)=>{
    console.log(err);
});