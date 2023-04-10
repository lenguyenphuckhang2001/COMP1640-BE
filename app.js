require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { connectDatabase } = require('./database/connect');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/api/user');
const authRouter = require('./routes/api/auth');
const tagRouter = require('./routes/api/tag');
const postRouter = require('./routes/api/post');
const bookmarkRouter = require('./routes/api/bookmarks');
const commentRouter = require('./routes/api/comments');
const departmentRouter = require('./routes/api/departments');

const { isLoggedIn } = require('./middlewares/authMiddleware');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/public/uploads')));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', isLoggedIn, usersRouter);
app.use('/api/tags', isLoggedIn, tagRouter);
app.use('/api/posts', isLoggedIn, postRouter);
app.use('/api/bookmarks', isLoggedIn, bookmarkRouter);
app.use('/api/comments', isLoggedIn, commentRouter);
app.use('/api/departments', isLoggedIn, departmentRouter);
app.use('/api/closeDate', isLoggedIn, require('./routes/api/closeDate'));

//connect to database
(async () => {
  await connectDatabase();
})();

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
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
