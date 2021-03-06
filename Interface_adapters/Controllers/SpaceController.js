const CreateSpace = require('../../Application_business_rules/Use_cases/Space/CreateSpace');
const ListSpaces = require('../../Application_business_rules/Use_cases/Space/ListSpaces');
const GetSpace = require('../../Application_business_rules/Use_cases/Space/GetSpace');
const DeleteSpace = require('../../Application_business_rules/Use_cases/Space/DeleteSpace');
const UpdateSpace = require('../../Application_business_rules/Use_cases/Space/UpdateSpace');

const SpaceEntity = require('../../Enterprise_business_rules/Entities/Space');

const SpaceRepository = require('../../Enterprise_business_rules/Repositories/SpaceRepository');
const SpaceRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/SpaceRepositoryMySQL');
const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');

const spaceRepositoryMySQL = new SpaceRepository(new SpaceRepositoryMySQL());
const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());

module.exports = {
  createSpace({ spaceData }) {
    const space = new SpaceEntity({ spaceData });
    return CreateSpace(space, { spaceRepositoryMySQL });
  },

  async listSpaces(idAdmin) {
    return ListSpaces(idAdmin, { spaceRepositoryMySQL }, { userRepositoryMySQL });
  },

  async getSpace(id) {
    return GetSpace(id, { spaceRepositoryMySQL });
  },

  async deleteSpace(name) {
    return DeleteSpace(name, { spaceRepositoryMySQL });
  },

  async updateSpace({ spaceData }) {
    return UpdateSpace({ spaceData }, { spaceRepositoryMySQL });
  },
};
