module.exports = (sequelize, type) => sequelize.define('Space', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: type.STRING,
  numRows: type.INTEGER,
  numSeats: type.INTEGER,
  isLab: type.BOOLEAN,
});
