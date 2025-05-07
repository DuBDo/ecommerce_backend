const Joi = require('joi');
const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    role: Joi.string().valid('buyer', 'seller')
});




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

        await bcrypt.genSalt(10);
        await bcrypt.hash(password, )
        await User.create(value);

        res.status(201).send({message:"Signed Up Successfully"});
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    createUser
}