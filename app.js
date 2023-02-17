require('dotenv').config()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const { connectDatabase } = require('./database/connect')

var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/api/users')
const usersRouter = require('./routes/api/user')

var app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

//connect to database
;(async () => {
    await connectDatabase()
})()

module.exports = app
