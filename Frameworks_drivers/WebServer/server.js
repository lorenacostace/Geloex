#!/usr/bin/env node

const express = require('express');
const { validate, ValidationError, Joi } = require('express-validation');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// const adminSystem = require('./adminSystem');
const teacherRouter = require('../../Interface_adapters/Routes/teacher');

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

// app.use('/AdminSystem', validate(UserValidation, {}, {}), adminSystem);
app.use('/teacher', teacherRouter);
app.all('*', (req, res, next) => {
  next(new ResponseError(`No se puede encontrar ${req.originalUrl} en este servidor`, 404));
});

// Para arrancar el servidor listen(puerto, callback)
const server = app.listen(3000, () => {
  const { port } = server.address();
  // eslint-disable-next-line no-console
  console.log('*** App arrancada en el puerto:', port);
});
