'use strict';

const { Inscribed } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class InscribedRepositoryMySQL {
  constructor() {
    this.model = Inscribed;
  }

  async createInscribed(inscribedData) {
    try {
      return this.model.create(inscribedData);
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear el la inscripción', 'error_create_inscribed');
    }
  }

  async deleteInscribed(inscribedData) {
    const { UserId, ExamId } = inscribedData;
    try {
      return this.model.destroy({
        where: {
          UserId, ExamId,
        },
      });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al borrar la inscripción', 'error_create_inscribed');
    }
  }

  async getListInscribed(ExamId) {
    try {
      return this.model.findAll({
        where: {
          ExamId,
        },
      });
    } catch (err) {
      return new ResponseError(TYPES_ERROR.ERROR, 'Fallo al realizar el listado de inscritos', 'users_not_exist');
    }
  }

  async getInscribed(UserId) {
    try {
      return this.model.findAll({
        where: {
          UserId,
        },
      });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al consultar las inscripciones de un alumno', 'error_get_inscribed');
    }
  }

  async isInscribed(inscribedData) {
    const { UserId, ExamId } = inscribedData;
    try {
      return this.model.findOne({
        where: {
          ExamId, UserId,
        },
      });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al consultar un inscrito', 'error_get_inscribed');
    }
  }
}

module.exports = InscribedRepositoryMySQL;
