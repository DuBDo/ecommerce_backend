const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['buyer', 'seller'],
        validate:(value)=>{
            return value.toLowerCase();
        }
    }
},{
    timeStamp: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;