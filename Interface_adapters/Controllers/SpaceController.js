const CreateSpace = require('../../Application_business_rules/Use_cases/Space/CreateSpace');
const ListSpaces = require('../../Application_business_rules/Use_cases/Space/ListSpaces');

const SpaceEntity = require('../../Enterprise_business_rules/Entities/Space');

const SpaceRepository = require('../../Enterprise_business_rules/Repositories/SpaceRepository');
const SpaceRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/SpaceRepositoryMySQL');

const spaceRepositoryMySQL = new SpaceRepository(new SpaceRepositoryMySQL());

module.exports = {
  createSpace({ spaceData }) {
    const space = new SpaceEntity({ spaceData });
    return CreateSpace(space, { spaceRepositoryMySQL });
  },

  async listSpaces() {
    return ListSpaces({ spaceRepositoryMySQL });
  },
};
