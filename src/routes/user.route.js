const express = require("express");
const { createUser } = require("../controller/user.controller");

const router = express.Router();

router.get('',(req, res)=>{
    res.send('Okay');
})

router.post('/signup',
    createUser
);

router.post('/login',(req, res)=>{
    res.send("login");
});
// router.route("/:id").delete().patch();


module.exports = router;