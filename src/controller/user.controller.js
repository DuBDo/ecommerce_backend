const Joi = require('joi');
const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30),

    password: Joi.string()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    role: Joi.string().valid('buyer', 'seller')
});


const authenticateUser = async(req, res, next)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email:email});
        const hashedPassword = user.password;

        const check = await bcrypt.compare(password, hashedPassword);

        if(!check){
            res.status(401).json({message:"Incorrect Password"});
        }else{
            const verifiedUser = {...user.toObject()};

            delete verifiedUser.password;

            const token = await jwt.sign(verifiedUser, process.env.TOKEN_SECRET_KEY);
            res.status(200).send({message: "You are logged In", token:token});
        }
    }catch(err){
        res.status(403).send({message: "Unauthorized User. Please SignUp first"});
    }
}

const createUser = async(req, res, next)=>{
    try{
        const data = req.body;
        const {error, value} = schema.validate(data, {
            allowUnknown: true
        });
        
        if(error){
            throw new Error(error);
        }
        const password = data.password;
        delete data.password;

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)
        await User.create({...value, password: hash});

        res.status(201).send({message:"Signed Up Successfully"});
    }catch(err){
        console.log(err);
    }
};

const updateUser = async(req, res, next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];

        const user = await jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        const result = await User.updateOne({email:user.email}, {$set:req.body});

        res.status(200).send({message:"User Updated Successfully", result: result});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const deleteUser = async(req, res, next)=>{
    try{
        const header = req.headers.authorization;
        const token = header.split(' ')[1];

        const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        console.log(data);
        
        const result = await User.deleteOne({email:data.email});

        if(!result.deletedCount){
            res.status(404).json({message: "User Not Found!"});
        }else{
            res.status(200).send(result);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
module.exports = {
    createUser,
    authenticateUser,
    deleteUser,
    updateUser
}