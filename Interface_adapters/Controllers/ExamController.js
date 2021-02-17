const CreateExam = require('../../Application_business_rules/Use_cases/Exam/CreateExam');

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
};
