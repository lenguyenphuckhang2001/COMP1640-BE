const UserServices = require("../services/UserServices");
const User = require("../database/models/User");
const { validateUser } = require("../helpers/validationHelper");

const register = (req, res) => {
    res.json({
        message: "Welcome to the API",
    });
};

const createUser = (req, res) => {
    try {
        if (!req.body) return res.sendStatus(400);
        const user = req.body;
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        res.render("view-information", { user });
    } catch (err) {
        next(err);
    }
};

const patchEditUser = async (req, res, next) => {
    try {
        const userUpdate = await User.findByIdAndUpdate(
            req.params.userId,
            req.body
        );
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deleteUserInfo = await User.findByIdAndDelete(req.params.userId);
        res.status(200).json(deleteUserInfo);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getAllUser = async (req, res, next) => {
    try {
        const getAllUser = await User.find({});
        res.json(getAllUser);
    } catch (err) {
        res.status(400).json(err);
    }
};

module.exports = {
    register,
    createUser,
    getUser,
    patchEditUser,
    deleteUser,
    getAllUser,
};
