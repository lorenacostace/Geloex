module.exports = (sequelize, type) => sequelize.define('Role', {
  role: type.STRING,
});
