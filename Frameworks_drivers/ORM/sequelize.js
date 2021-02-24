'use strict';

const Sequelize = require('sequelize');

const UserModel = require('../Database/Models/user');
const SpaceModel = require('../Database/Models/space');
const SubjectModel = require('../Database/Models/subject');
const ExamModel = require('../Database/Models/exam');
const RoleModel = require('../Database/Models/role');
const InscribedModel = require('../Database/Models/inscribed');
const ReservationModel = require('../Database/Models/reservation');

const sequelize = new Sequelize('Geloex', 'root', 'password', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

/* Ubicación donde las instancias de los Modelos son creadas */
const User = UserModel(sequelize, Sequelize);
const Space = SpaceModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);
const Exam = ExamModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
const Inscribed = InscribedModel(sequelize, Sequelize);
const Reservation = ReservationModel(sequelize, Sequelize);

// ASSOCIATIONS
User.hasMany(Role, {
  allowNull: false,
  onDelete: 'cascade',
});
Role.belongsTo(User);
User.belongsToMany(Exam, {
  allowNull: false,
  through: 'Inscribed',
  onDelete: 'cascade',
});
Exam.belongsToMany(User, {
  allowNull: false,
  through: 'Inscribed',
  onDelete: 'cascade',
});
Space.belongsToMany(Exam, {
  allowNull: false,
  through: 'Reservation',
  onDelete: 'cascade',
});
Exam.belongsTo(Space);

// inicizlización de tablas
const init = async () => {
  try {
    await User.create({ name: 'User', fSurname: 'Admin', sSurname: 'System', email: 'adminSys@geloex.com' });
    await Role.create({ UserId: 1, role: 'SYSTEMS ADMINISTRATOR' });
  } catch (err) {
    throw new Error('Fallo al crear el usuario');
  }
};
// Sincronizamos con la base de datos
sequelize.sync({ force: false })
  .then(() => {
    // init();
    // eslint-disable-next-line no-console
    console.log('Tablas sincronizadas');
  });

// Exporto los objetos que voy a necesitar
module.exports = {
  User, Space, Subject, Exam, Role, Inscribed, Reservation,
};
