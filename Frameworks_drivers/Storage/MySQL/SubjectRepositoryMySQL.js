'use strict';

const { Subject } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class SubjectRepositoryMySQL {
  constructor() {
    this.model = Subject;
  }

  async createSubject(name) {
    try {
      return this.model.create({ name });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear la asignatura', 'error_create_subject');
    }
  }

  async deleteSubject(idSubject) {
    try {
      return this.model.destroy({ where: { id: idSubject } });
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al eliminar la asignatura', 'error_delete_subject');
    }
  }

  async getName(name) {
    return this.model.findOne({ where: { name } });
  }

  async getSubject(id) {
    return this.model.findOne({ where: { id } });
  }

  async getSubjects() {
    try {
      return this.model.findAll();
    } catch (err) {
      return new ResponseError(TYPES_ERROR.ERROR, 'No existen asignaturas registradas', 'subject_not_exist');
    }
  }

  async updateSubject({ subjectData }) {
    const { id, name } = subjectData;
    /* const data = {
      name,
    }; */
    const subject = await this.model.findByPk(id);
    if (!subject) {
      return new ResponseError(TYPES_ERROR.FATAL, 'La asignatura no existe', 'space_not_exist');
    }
    try {
      return this.model.update({ name }, {
        where: { id },
      });
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo al actualizar la asignatura', 'error_subject_update');
    }
  }
}

module.exports = SubjectRepositoryMySQL;
