const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.ObjectId;

const orderSchema = mongoose.Schema({
    product:{
        type: ObjectId,
        required:true,
        ref: "Product"
    },
    quantity:{
        type:Number,
        required:true
    },
    orderDate:{
        type: Date,
        default: Date.now
    },
    orderedBy:{
        type: ObjectId,
        ref: "User"
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;