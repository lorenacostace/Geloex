module.exports = (sequelize, type) => sequelize.define('User', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: type.STRING,
  fSurname: type.STRING,
  sSurname: type.STRING,
  email: type.STRING,
});
