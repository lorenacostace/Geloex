#!/usr/bin/env node

const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const teacherRouter = require('../../Interface_adapters/Routes/teacher');
const spaceRouter = require('../../Interface_adapters/Routes/space');
const subjectRouter = require('../../Interface_adapters/Routes/subject');
const adminSystRouter = require('../../Interface_adapters/Routes/adminSystem');
const roleRouter = require('../../Interface_adapters/Routes/role');
const examRouter = require('../../Interface_adapters/Routes/exam');
const adminExamRouter = require('../../Interface_adapters/Routes/adminExam');
const studentRouter = require('../../Interface_adapters/Routes/student');
const inscribedRouter = require('../../Interface_adapters/Routes/inscribed');

const ResponseError = require('../../Enterprise_business_rules/Manage_error/ResponseError');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('../ORM/sequelize');

const UserValidation = {
  body: Joi.object({
    name: Joi.string()
      .required(),
    fSurname: Joi.string()
      .required(),
    sSurname: Joi.string()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/),
    id: Joi.number()
      .integer(),
  }),
};

app.use('/adminSystem', adminSystRouter);
app.use('/adminExam', adminExamRouter);
app.use('/teacher', teacherRouter);
app.use('/student', studentRouter);
app.use('/space', spaceRouter);
app.use('/subject', subjectRouter);
app.use('/role', roleRouter);
app.use('/exam', examRouter);
app.use('/inscribed', inscribedRouter);
app.all('*', (req, res, next) => {
  next(new ResponseError(`No se puede encontrar ${req.originalUrl} en este servidor`, 404));
});

// Para arrancar el servidor listen(puerto, callback)
const server = app.listen(3000, () => {
  const { port } = server.address();
  // eslint-disable-next-line no-console
  console.log('*** App arrancada en el puerto:', port);
});
