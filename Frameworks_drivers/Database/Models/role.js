module.exports = (sequelize, type) => sequelize.define('Role', {
  idUser: type.INTEGER,
  role: type.STRING,
});
