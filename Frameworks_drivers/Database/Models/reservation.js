module.exports = (sequelize, type) => sequelize.define('Reservation', {
  date: type.STRING,
});
