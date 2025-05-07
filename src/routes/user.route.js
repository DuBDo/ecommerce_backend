const express = require("express");
const { createUser, deleteUser, authenticateUser, updateUser } = require("../controller/user.controller");

const router = express.Router();


router.post('/signup',
    createUser
);

router.post('/login',
    authenticateUser
);

router.put('/update',
    updateUser
)

router.delete('/delete',
    deleteUser
);
// router.route("/:id").delete().patch();


module.exports = router;