module.exports = (sequelize, type) => sequelize.define('Exam', {
  id: {
    type: type.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  subject: type.STRING,
  teacher: type.STRING,
  space: type.STRING,
  date: type.STRING,
  group: type.STRING,
  state: type.STRING,
});
