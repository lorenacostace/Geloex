const CreateTeacher = require('../../Application_business_rules/Use_cases/Teacher/CreateTeacher');
const DeleteTeacher = require('../../Application_business_rules/Use_cases/Teacher/DeleteTeacher');
const ListTeachers = require('../../Application_business_rules/Use_cases/Teacher/ListTeachers');
const UpdateTeacher = require('../../Application_business_rules/Use_cases/Teacher/UpdateTeacher');
const GetTeacher = require('../../Application_business_rules/Use_cases/Teacher/GetTeacher');

const TeacherEntity = require('../../Enterprise_business_rules/Entities/Teacher');

const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');

const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());

module.exports = {
  createTeacher({ teacherData }) {
    const { idAdmin, ...userData } = teacherData;
    const teacher = new TeacherEntity({ userData });
    return CreateTeacher(idAdmin, teacher, { userRepositoryMySQL });
  },

  async deleteTeacher({ usersData }) {
    return DeleteTeacher({ usersData }, { userRepositoryMySQL });
  },

  async listTeachers(idAdmin) {
    return ListTeachers(idAdmin, { userRepositoryMySQL });
  },

  async updateTeacher({ usersData }) {
    return UpdateTeacher({ usersData }, { userRepositoryMySQL });
  },

  async getTeacher({ usersData }) {
    return GetTeacher({ usersData }, { userRepositoryMySQL });
  },
};
