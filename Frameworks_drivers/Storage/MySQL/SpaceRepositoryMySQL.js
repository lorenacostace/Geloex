'use strict';

const { Space } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class SpaceRepositoryMySQL {
  constructor() {
    this.model = Space;
  }

  createSpace({ spaceData }) {
    const { name, numRows, numSeats, isLab } = spaceData;
    try {
      return this.model.create({ name, numRows, numSeats, isLab });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear el usuario', 'error_create_user');
    }
  }

  getName(name) {
    return this.model.findOne({ where: { name } });
  }
}

module.exports = SpaceRepositoryMySQL;
