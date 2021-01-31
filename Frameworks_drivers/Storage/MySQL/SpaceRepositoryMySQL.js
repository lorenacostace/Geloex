'use strict';

const { Space } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class SpaceRepositoryMySQL {
  constructor() {
    this.model = Space;
  }

  async createSpace({ spaceData }) {
    const { name, numRows, numSeats, isLab } = spaceData;
    try {
      return this.model.create({ name, numRows, numSeats, isLab });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear el aula o laboratorio', 'error_create_space');
    }
  }

  async getSpaces() {
    try {
      return this.model.findAll();
    } catch (err) {
      return new ResponseError(TYPES_ERROR.ERROR, 'No existen aulas o laboratorios registrados', 'users_not_exist');
    }
  }

  async getName(name) {
    return this.model.findOne({ where: { name } });
  }

  async getSpace(id) {
    return this.model.findOne({ where: { id } });
  }

  async deleteSpace(idSpace) {
    return this.model.destroy({ where: { id: idSpace } });
  }

  async updateSpace({ spaceData }) {
    const { id, name, numRows, numSeats, isLab } = spaceData;
    const data = {
      name,
      numRows,
      numSeats,
      isLab,
    };
    const space = await this.model.findByPk(id);
    if (!space) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El aula o laboratorio no existe', 'space_not_exist');
    }
    try {
      return this.model.update(data, {
        where: { id },
      });
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo al actualizar el aula o laboratorio', 'error_space_update');
    }
  }
}

module.exports = SpaceRepositoryMySQL;
