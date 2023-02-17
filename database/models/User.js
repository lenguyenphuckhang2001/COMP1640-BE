const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
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
            enum: ['ADMIN', 'USER', 'QA'],
            default: 'USER',
        },
        department: {
            type: String,
            enum: ['HR', 'IT', 'QA', 'SALES'],
            default: 'HR',
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
