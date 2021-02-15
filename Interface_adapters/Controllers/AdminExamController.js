const CreateAdminExam = require('../../Application_business_rules/Use_cases/AdminExam/CreateAdminExam');
const GetAdminExam = require('../../Application_business_rules/Use_cases/AdminExam/GetAdminExam');
const ListAdminExam = require('../../Application_business_rules/Use_cases/AdminExam/ListAdminExam');
const DeleteAdminExam = require('../../Application_business_rules/Use_cases/AdminExam/DeleteAdminExam');
const UpdateAdminExam = require('../../Application_business_rules/Use_cases/AdminExam/UpdateAdminExam');

const AdminExamEntity = require('../../Enterprise_business_rules/Entities/AdminExam');

const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');

const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());

module.exports = {
  createAdminExam({ adminExamData }) {
    const { idAdmin } = adminExamData;
    const adminExam = new AdminExamEntity({ userData: { idAdmin, ...adminExamData } });
    return CreateAdminExam(idAdmin, adminExam, { userRepositoryMySQL });
  },

  async getAdminExam({ usersData }) {
    return GetAdminExam({ usersData }, { userRepositoryMySQL });
  },

  async listAdminExam(idAdmin) {
    return ListAdminExam(idAdmin, { userRepositoryMySQL });
  },

  async deleteAdminExam({ usersData }) {
    return DeleteAdminExam({ usersData }, { userRepositoryMySQL });
  },

  async updateAdminExam({ usersData }) {
    return UpdateAdminExam({ usersData }, { userRepositoryMySQL });
  },
};
