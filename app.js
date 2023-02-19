require('dotenv').config()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const { connectDatabase } = require('./database/connect')

var indexRouter = require('./routes/index')
const usersRouter = require('./routes/api/user')
const tagRouter = require('./routes/api/tag')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/tags', tagRouter)

// /users/

//connect to database
;(async () => {
    await connectDatabase()
})()

module.exports = app
