const AddRole = require('../../Application_business_rules/Use_cases/Role/AddRole');
const ModifyRole = require('../../Application_business_rules/Use_cases/Role/ModifyRole');
const DeleteRole = require('../../Application_business_rules/Use_cases/Role/DeleteRole');

const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');

const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());

module.exports = {
  addRole({ roleData }) {
    return AddRole({ roleData }, { userRepositoryMySQL });
  },

  async modifyRole({ roleData }) {
    return ModifyRole({ roleData }, { userRepositoryMySQL });
  },

  async deleteRole({ userData }) {
    return DeleteRole({ userData }, { userRepositoryMySQL });
  },
};
