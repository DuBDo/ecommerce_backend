const express = require("express");

const router = express.Router();


router.route("/user")
.get((req, res)=>{
    res.send("Users");
})
.post((req, res)=>{
    res.send("Users");
});
// router.route("/:id").delete().patch();


module.exports = router;