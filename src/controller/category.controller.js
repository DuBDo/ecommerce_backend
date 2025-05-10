const Joi = require('joi');
const Category = require('../model/category.model');


const categorySchema = Joi.object({
    title: Joi.string().min(3).max(30).required()
})

const createCategory = async(req, res, next)=>{
    try{
        const {error, value} =categorySchema.validate(req.body);
        if(error){
            next(error);
        }

        const data= await Category.create(value);

        res.status(200).send({message:'Category Created Successfully'});
        
    }catch(err){
        next(err);
    }
}

const getCategories = async (req, res, next)=>{
    try {
        const categories = await Category.find();
        res.status(201).send(categories);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getCategories,
    createCategory
};