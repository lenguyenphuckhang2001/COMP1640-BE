const mongoose = require('mongoose')
const { Role } = require('../../constants/role')
const { Department } = require('../../constants/department')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: [Role.ADMIN_ROLE, Role.USER_ROLE, Role.QA_ROLE],
            default: Role.USER_ROLE,
        },
        department: {
            type: String,
            enum: [
                Department.IT_DEPARTMENT,
                Department.ADMISSIONS_DEPARTMENT,
                Department.TRAINNING_DEPARTMENT,
            ],
            default: Department.IT_DEPARTMENT,
        },
        userImage: {
            type: String,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
