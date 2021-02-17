const CreateExam = require('../../Application_business_rules/Use_cases/Exam/CreateExam');
const GetExam = require('../../Application_business_rules/Use_cases/Exam/GetExam');
const DeleteExam = require('../../Application_business_rules/Use_cases/Exam/DeleteExam');
const UpdateExam = require('../../Application_business_rules/Use_cases/Exam/UpdateExam');

const ExamEntity = require('../../Enterprise_business_rules/Entities/Exam');

const ExamRepository = require('../../Enterprise_business_rules/Repositories/ExamRepository');
const ExamRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/ExamRepositoryMySQL');
const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');
const SpaceRepository = require('../../Enterprise_business_rules/Repositories/SpaceRepository');
const SpaceRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/SpaceRepositoryMySQL');


const examRepositoryMySQL = new ExamRepository(new ExamRepositoryMySQL());
const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());
const spaceRepositoryMySQL = new SpaceRepository(new SpaceRepositoryMySQL());

module.exports = {
  createExam(Data) {
    const { idAdmin, ...examData } = Data;
    const { exam } = examData;
    const examEntity = new ExamEntity(exam);
    return CreateExam(
      idAdmin,
      examEntity,
      { examRepositoryMySQL },
      { userRepositoryMySQL },
    );
  },

  async getExam(examData) {
    // se comprueba si llega el aula
    const repositories = {
      examRepositoryMySQL, userRepositoryMySQL,
    };
    return GetExam(examData, repositories);
  },

  async deleteExam(examData) {
    const repositories = {
      examRepositoryMySQL, userRepositoryMySQL,
    };
    return DeleteExam(examData, repositories);
  },

  async updateExam(examData) {
    const { year } = examData;
    const repositories = {
      examRepositoryMySQL, userRepositoryMySQL,
    };
    if (year) {
      const { idAdmin, id, subject, group, teacher, space, state } = examData;
      const dateObj = new Date(examData.year, examData.month, examData.day, examData.hour, examData.minutes);
      const dataExam = { idAdmin, id, subject, group, teacher, space, state, date: dateObj.toString() };
      return UpdateExam({ dataExam }, repositories);
    }
    return UpdateExam({ dataExam: { examData } }, repositories);
  },
};
