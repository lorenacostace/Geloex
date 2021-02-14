const CreateAdminSystem = require('../../Application_business_rules/Use_cases/AdminSystem/CreateAdminSystem');
const DeleteAdminSystem = require('../../Application_business_rules/Use_cases/AdminSystem/DeleteAdminSystem');
const GetAdminSystem = require('../../Application_business_rules/Use_cases/AdminSystem/GetAdminSystem');

const AdminEntity = require('../../Enterprise_business_rules/Entities/AdminSystem');

const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');

const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());

module.exports = {
  createAdminSystem({ adminSystemData }) {
    const adminSys = new AdminEntity({ userData: adminSystemData });
    return CreateAdminSystem(adminSys, { userRepositoryMySQL });
  },

  async deleteAdminSystem({ usersData }) {
    return DeleteAdminSystem({ usersData }, { userRepositoryMySQL });
  },

  async getAdminSystem({ usersData }) {
    return GetAdminSystem({ usersData }, { userRepositoryMySQL });
  },
};
