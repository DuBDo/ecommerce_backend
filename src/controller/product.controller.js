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
        req.body.createdBy = req.user._id;
        const {error, value} = productSchema.validate(req.body, {allowUnknown: true});

        if(error){
            res.status(400).send({message:error.message});
            // throw new Error(error)
        }

        await Product.create(value);

        res.status(201).send({message:'Product Created'});
    }catch(err){
        res.status(500).send({message: 'Product Can not be created'});
        // next(err)
    }
}


module.exports ={
    getProducts,
    createProduct
}