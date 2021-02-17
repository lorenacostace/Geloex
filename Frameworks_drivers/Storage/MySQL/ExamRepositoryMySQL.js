'use strict';

const { Exam } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class ExamRepositoryMySQL {
  constructor() {
    this.model = Exam;
  }

  async createExam(examData) {
    try {
      const { subject, group, dateExam, state, teacher, space } = examData;
      const date = dateExam.toString();
      const exam = await this.model.create({ subject, group, date, state, teacher, space });
      return exam;
    } catch (err) {
      console.log(err);
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear el examen', 'error_create_exam');
    }
  }
}

module.exports = ExamRepositoryMySQL;
