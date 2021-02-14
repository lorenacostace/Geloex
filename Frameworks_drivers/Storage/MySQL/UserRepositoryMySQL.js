'use strict';

const Sequelize = require('sequelize');
const { User, Role, Op } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class UserRepositoryMySQL {
  constructor() {
    this.UserModel = User;
    this.RoleModel = Role;
  }

  async addRole({ roleData }) {
    const { UserId, role } = roleData;
    try {
      return this.RoleModel.create({ UserId, role });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al añadir el rol', 'error_create_user');
    }
  }

  async createUser({ userData }) {
    const { name, fSurname, sSurname, email } = userData;
    try {
      return this.UserModel.create({ name, fSurname, sSurname, email });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear el usuario', 'error_create_user');
    }
  }

  async deleteUser(userId) {
    return this.UserModel.destroy({ where: { id: userId } });
  }

  async deleteRole({ roleData }) {
    const { idUser, role } = roleData;
    return this.RoleModel.destroy({
      where: {
        idUser, role,
      },
    });
  }

  async deleteRoles(idUser) {
    return this.RoleModel.destroy({
      where: {
        idUser,
      },
    });
  }

  async getByEmail(userEmail) {
    return this.UserModel.findOne({ where: { email: userEmail } });
  }

  async getListUsers({ role }) {
    try {
      return this.UserModel.findAll({
        attributes: ['name', 'fSurname', 'sSurname', 'email'],
        include: {
          model: Role,
          where: {
            role,
          },
        },
      });
    } catch (err) {
      console.log(err);
      return new ResponseError(TYPES_ERROR.ERROR, 'No existen usuarios', 'users_not_exist');
    }
  }

  async getRole({ userRoleData }) {
    const { UserId, role } = userRoleData;
    if (!UserId) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario', 'id_empty');
    }
    try {
      const roleUser = await this.RoleModel.findOne({
        where: {
          role, UserId,
        },
      });
      return roleUser;
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }
  }

  async getUser(id) {
    if (!id) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario', 'id_empty');
    }
    try {
      return this.UserModel.findByPk(id);
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }
  }

  async userRoles(id) {
    if (!id) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario', 'id_empty');
    }
    try {
      const aux = await this.RoleModel.findAll({ where: { idUser: id } });
      return aux;
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }
  }

  /**
   * Update User
   * @param {} teacherData
   * @returns {Promise<ResponseError| Promise>}
   */
  async updateUser({ userData }) {
    const { id, name, fSurname, sSurname, email } = userData;
    const updateData = {
      name,
      fSurname,
      sSurname,
      email,
    };
    const user = await this.UserModel.findByPk(id);
    if (!user) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }
    try {
      return this.UserModel.update(updateData, {
        where: { id },
      });
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo al actualizar el usuario', 'error_user_update');
    }
  }

  async modifyRole({ userRoleData }) {
    const { idUser, roleCurrent, roleNew } = userRoleData;

    // Se comprueba que el usuario existe
    const user = await this.UserModel.findByPk(idUser);
    if (!user) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }

    try {
      return this.RoleModel.update({ role: roleNew }, {
        where: {
          idUser, role: roleCurrent,
        },
      });
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo al actualizar el usuario', 'error_user_update');
    }
  }
}

module.exports = UserRepositoryMySQL;
