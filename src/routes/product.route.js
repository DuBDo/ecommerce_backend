const express = require("express");
const { authenticate, isSeller } = require("../middleware/auth");
const { createProduct, getProducts } = require("../controller/product.controller");

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(  
        authenticate,
        isSeller,
        createProduct
    );
// router.route("/:id").get().delete().patch();


module.exports = router