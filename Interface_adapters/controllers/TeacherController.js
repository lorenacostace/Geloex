const CreateTeacher = require('../../Application_business_rules/use_cases/Teacher/CreateTeacher');
const DeleteTeacher = require('../../Application_business_rules/use_cases/Teacher/DeleteTeacher');
const ListTeachers = require('../../Application_business_rules/use_cases/Teacher/ListTeachers');
const UpdateTeacher = require('../../Application_business_rules/use_cases/Teacher/UpdateTeacher');
const GetTeacher = require('../../Application_business_rules/use_cases/Teacher/GetTeacher');

const TeacherEntity = require('../../Enterprise_business_rules/Entities/Teacher');

const UserRepository = require('../../Application_business_rules/repositories/UserRepository');
const UserRepositoryMySQL = require('../storage/MySQL/UserRepositoryMySQL');

const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());

module.exports = {
  createTeacher({ teacherData }) {
    const teacher = new TeacherEntity({ userData: teacherData });
    return CreateTeacher(teacher, { userRepositoryMySQL });
  },

  async deleteTeacher(id) {
    return DeleteTeacher(id, { userRepositoryMySQL });
  },

  async listTeachers() {
    return ListTeachers({ userRepositoryMySQL });
  },

  async updateTeacher({ teacherData }) {
    return UpdateTeacher({ teacherData }, { userRepositoryMySQL });
  },

  async getTeacher(id) {
    return GetTeacher(id, { userRepositoryMySQL });
  },
};
