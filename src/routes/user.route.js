const express = require("express");
const { getUsers, createUser, deleteUser, login, authenticateUser, updateUser } = require("../controller/user.controller");

const router = express.Router();


router.get('/',
    getUsers
)

router.post('/signup',
    createUser
);

router.post('/login',
    login
);

router.put('/update',
    updateUser
)

router.delete('/delete',
    deleteUser
);
// router.route("/:id").delete().patch();


module.exports = router;