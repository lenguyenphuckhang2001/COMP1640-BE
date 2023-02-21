var express = require("express");
var router = express.Router();
const {
    createUser,
    register,
    getUser,
    patchEditUser,
    deleteUser,
    getAllUser,
} = require("../../controllers/UserController");

//Get all users
router.get("/", getAllUser);

router.post("/register", register);

router.post("/create", createUser);

router.get("/:userId", getUser);

router.patch("/:userId", patchEditUser);

router.delete("/:userId", deleteUser);

module.exports = router;
