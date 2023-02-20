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
const Post = require('./database/models/Post')
const Tag = require('./database/models/Tag')
const User = require('./database/models/User')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/tags', tagRouter)

//connect to database
;(async () => {
    await connectDatabase()
})()
;(async () => {
    // const tag = await Tag.create([
    //     {
    //         name: 'Node.js',
    //         description:
    //             'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.',
    //     },
    //     {
    //         name: 'Express.js',
    //         description:
    //             'Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License.',
    //     },
    // ])
    const chosenTags = await Tag.find(
        {
            name: { $in: ['Node.js', 'Express.js'] },
        },
        { _id: 1 }
    )

    const chosenOneUser = await User.findById('63f2deea0e2a6cab3b7541e0', {
        _id: 1,
    })
    const User2 = await User.findById('63f3501785df4509adae16d3', {
        _id: 1,
    })

    // const article = await Post.create({
    //     title: 'Giang dep trai',
    //     content: 'This is the content of my third',
    //     author: chosenOneUser,
    //     tags: [...chosenTags],
    //     comments: [
    //         {
    //             content: 'This is the content of my third',
    //             author: User2,
    //         },
    //     ],
    // })

    const article = await Post.findById('63f3c7ae542fd33fd71f0ab7')
        .populate('tags author', {
            name: 1,
            description: 1,
            username: 1,
        })
        .populate('comments.author', {
            email: 1,
        })

    console.log('🚀 ~ file: app.js:67 ~ ; ~ article:', article)

    // const createdArticle = await Post.findById(
    //     '63f3b1d782b2b0c24fb0cf91'
    // ).populate('tags', {
    //     name: 1,
    //     description: 1,
    // })
    // console.log(createdArticle)
    // const updateArticle = await Post.findByIdAndUpdate(
    //     '63f3b1d782b2b0c24fb0cf91',
    //     {
    //         title: 'My first blog post',
    //         content: 'This is the content of my third blog post',
    //     },
    //     {
    //         new: true,
    //     }
    // )
    // console.log(updateArticle)
})()

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
