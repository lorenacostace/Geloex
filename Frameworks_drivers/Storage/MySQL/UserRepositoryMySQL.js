'use strict';

const { User } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class UserRepositoryMySQL {
  constructor() {
    this.model = User;
  }

  async createUser({ teacherData }) {
    const { name, fSurname, sSurname, email, role } = teacherData;
    try {
      return this.model.create({ name, fSurname, sSurname, email, role });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear el usuario', 'error_create_user');
    }
  }

  async updateUser({ teacherData }) {
    const { id, name, fSurname, sSurname, email } = teacherData;
    const userData = {
      name,
      fSurname,
      sSurname,
      email,
    };
    const user = await this.model.findByPk(id);
    if (!user) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }
    try {
      return this.model.update(userData, {
        where: { id },
      });
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo al actualizar el usuario', 'error_user_update');
    }
  }

  async deleteUser(teacherId) {
    return this.model.destroy({ where: { id: teacherId } });
  }

  async getByEmail(userEmail) {
    return this.model.findOne({ where: { email: userEmail } });
  }

  async getListUsers() {
    try {
      return this.model.findAll();
    } catch (err) {
      return new ResponseError(TYPES_ERROR.ERROR, 'No existen usuarios', 'users_not_exist');
    }
  }

  async getUser(id) {
    if (!id) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario', 'id_empty');
    }
    try {
      return this.model.findByPk(id);
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }
  }
}

module.exports = UserRepositoryMySQL;
