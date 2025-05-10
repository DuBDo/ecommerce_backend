const Joi = require('joi');
const Product = require('../model/product.model');

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    image: Joi.string(),
    discription: Joi.string().required(),
    category: Joi.string(),
    createdBy: Joi.string()
})

const getProducts = async (req, res, next)=>{
    try{
        const products = await Product.find().populate('category').populate('createdBy',{password:0});

        res.status(200).send(products);
    }catch(error){
        res.send({messagge:error.message});
    }
}

const createProduct = async (req, res, next)=>{
    try{
        const {error, value} = productSchema.validate(req.body, {allowUnknown: true});

        if(error){
            res.status(400).send({message:error.message});
        }

        await Product.create(value);

        res.status(201).send({message:'Product Created'});
    }catch(error){
        res.status(500).send({message: 'Product Can not be created'});
    }
}


module.exports ={
    getProducts,
    createProduct
}