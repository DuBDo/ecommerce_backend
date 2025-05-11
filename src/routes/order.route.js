const express = require("express");
const { getOrder, createOrder } = require("../controller/order.controller");
const { authenticate, isBuyer } = require("../middleware/auth");

const router = express.Router();

router.route('')
    .get(
        authenticate,
        isBuyer,
        getOrder
    )
    .post(
        authenticate,
        isBuyer,
        createOrder
    );


module.exports = router;