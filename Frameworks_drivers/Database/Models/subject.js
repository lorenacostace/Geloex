module.exports = (sequelize, type) => sequelize.define('Subject', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: type.STRING,
});
