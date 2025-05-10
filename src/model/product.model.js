const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    image:{
        type:String
    },
    discription:{
        type: String
    },
    category:{
        type: ObjectId,
        ref: 'Category'
    },
    createdBy:{
        type: ObjectId,
        ref: 'User'
    }
},{
    timeStamp: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;