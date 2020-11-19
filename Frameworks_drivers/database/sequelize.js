'use strict';

const Sequelize = require('sequelize');

const UserModel = require('./Models/user');

const sequelize = new Sequelize('Geloex', 'root', 'password', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

const User = UserModel(sequelize, Sequelize);

// Sincronizamos con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Tablas sincronizadas');
  });

// Exporto los objetos que voy a necesitar
module.exports = {
  User,
};
