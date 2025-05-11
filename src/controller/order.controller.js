const Order = require("../model/order.model");
const Joi = require("joi");
const Product = require("../model/product.model");

const postOrderSchema = Joi.object({
    product: Joi.string().required(),
    quantity: Joi.number().required(),
    orderDate: Joi.date(),
    orderedBy: Joi.string()
})

const getOrder= async(req, res, next)=>{
    try{
        const user = req.user;
        console.log(user);
        const orders = await Order.find({orderedBy:user._id}).populate('product').populate('orderedBy', {password:0});

        console.log(orders);
        res.status(200).send({message:"Your Orders",
            orders: orders
        })
    } catch (error){
        next(error);
    }
}

const createOrder = async(req, res, next)=>{
    try{
        req.body.orderedBy = req.user._id;

        const product = await Product.findOne({},{name:req.body.product});

        // product = {...product.toObject()};
        console.log(product);
        req.body.product = String(product._id);
        console.log(req.body);
        const {error, value} = postOrderSchema.validate(req.body);

        if(!error){
            
            await Order.create(value);
            res.status(201).send({message:'Order Placed!!'});
        }else{
            res.status(400).send({message:'Input Mismatch'});
        }
    }catch(error){
        res.status(500).send({message:'Internal Server Error'});
    }
}


module.exports = {
    getOrder,
    createOrder
}