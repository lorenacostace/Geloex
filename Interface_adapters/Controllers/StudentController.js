const CreateStudent = require('../../Application_business_rules/Use_cases/Student/CreateStudent');
const GetStudent = require('../../Application_business_rules/Use_cases/Student/GetStudent');
const ListStudent = require('../../Application_business_rules/Use_cases/Student/ListStudent');

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

  async getStudent({ usersData }) {
    return GetStudent({ usersData }, { userRepositoryMySQL });
  },

  async listStudent(idAdmin) {
    return ListStudent(idAdmin, { userRepositoryMySQL });
  },
};
