const CreateStudent = require('../../Application_business_rules/Use_cases/Student/CreateStudent');

const StudentEntity = require('../../Enterprise_business_rules/Entities/Student');

const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');

const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());

module.exports = {
  createStudent({ studentData }) {
    const { idAdmin, ...userData } = studentData;
    const student = new StudentEntity(userData);
    return CreateStudent(idAdmin, student, { userRepositoryMySQL });
  },
};
