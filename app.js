require('dotenv').config()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const { connectDatabase } = require('./database/connect')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

var indexRouter = require('./routes/index')
const usersRouter = require('./routes/api/user')
const tagRouter = require('./routes/api/tag')
const postRouter = require('./routes/api/post')

const Post = require('./database/models/Post')
const Tag = require('./database/models/Tag')
const User = require('./database/models/User')
const multer = require('multer')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/tags', tagRouter)
app.use('/posts', postRouter)

//connect to database
;(async () => {
    await connectDatabase()
})()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') +
                file.originalname +
                '.jpg'
        )
    },
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
})
app.post('/upload', upload.any(), (req, res, next) => {
    // const file = req.file
    // if (!file) {
    //     const error = new Error('Please upload a file')
    //     error.httpStatusCode = 400
    //     return next(error)
    // }
    // res.send(file)
    const { test } = req.body
    console.log('🚀 ~ file: app.js:77 ~ app.post ~ test:', test)
    console.log(req.files)
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LogRocket Express API with Swagger',
            version: '0.1.0',
            description:
                'This is a simple CRUD API application made with Express and documented with Swagger',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'LogRocket',
                url: 'https://logrocket.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/api/*.js'],
}

const specs = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

module.exports = app
