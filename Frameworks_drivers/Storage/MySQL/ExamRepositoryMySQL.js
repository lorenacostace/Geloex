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

  async getExam(id) {
    if (!id) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El id es necesario', 'id_empty');
    }
    try {
      const exam = await this.model.findByPk(id);
      return exam;
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El usuario no existe', 'user_not_exist');
    }
  }

  async existExam(dataExam) {
    try {
      const { subject, group, date } = dataExam;
      if (!subject || !group || !date) {
        return new ResponseError(TYPES_ERROR.FATAL, 'La asignatura, la fecha y el grupo son necesarios', 'incomplete_data');
      }
      const exam = await this.model.findOne({
        where: {
          subject, group, date,
        },
      });
      return exam;
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo en la búsqueda de un examen', 'search_exam_fail');
    }
  }

  async deleteExam(id) {
    try {
      return this.model.destroy({ where: { id } });
    } catch (err) {
      console.log(err);
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo en la búsqueda de un examen', 'search_exam_fail');
    }
  }

  async updateExam({ examData }) {
    const { id, subject, group, date, space, teacher, state } = examData;
    const updateData = {
      subject,
      group,
      date,
      space,
      teacher,
      state,
    };
    const exam = await this.model.findByPk(id);
    if (!exam) {
      return new ResponseError(TYPES_ERROR.FATAL, 'El examen no existe', 'exam_not_exist');
    }
    try {
      return this.model.update(updateData, {
        where: { id },
      });
    } catch (err) {
      return new ResponseError(TYPES_ERROR.FATAL, 'Fallo al actualizar el examen', 'error_user_update');
    }
  }
}


module.exports = ExamRepositoryMySQL;
