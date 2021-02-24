const CreateInscribed = require('../../Application_business_rules/Use_cases/Inscribed/CreateInscribed');
const DeleteInscribed = require('../../Application_business_rules/Use_cases/Inscribed/DeleteInscribed');
const GetInscribed = require('../../Application_business_rules/Use_cases/Inscribed/GetInscribed');
const ListInscribed = require('../../Application_business_rules/Use_cases/Inscribed/ListInscribed');

const UserRepository = require('../../Enterprise_business_rules/Repositories/UserRepository');
const UserRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/UserRepositoryMySQL');
const InscribedRepository = require('../../Enterprise_business_rules/Repositories/InscribedRepository');
const InscribedRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/InscribedRepositoryMySQL');
const ExamRepository = require('../../Enterprise_business_rules/Repositories/ExamRepository');
const ExamRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/ExamRepositoryMySQL');

const userRepositoryMySQL = new UserRepository(new UserRepositoryMySQL());
const inscribedRepositoryMySQL = new InscribedRepository(new InscribedRepositoryMySQL());
const examRepositoryMySQL = new ExamRepository(new ExamRepositoryMySQL());

module.exports = {
  createInscribed(inscribedData) {
    const repositories = {
      inscribedRepositoryMySQL, userRepositoryMySQL,
    };
    return CreateInscribed(inscribedData, repositories);
  },

  async deleteInscribed(inscribedData) {
    const repositories = {
      inscribedRepositoryMySQL, userRepositoryMySQL,
    };
    return DeleteInscribed(inscribedData, repositories);
  },

  async getInscribed(inscribedData) {
    const repositories = {
      inscribedRepositoryMySQL, userRepositoryMySQL,
    };
    return GetInscribed(inscribedData, repositories);
  },

  async listInscribed(inscribedData) {
    const repositories = {
      inscribedRepositoryMySQL, userRepositoryMySQL, examRepositoryMySQL,
    };
    return ListInscribed(inscribedData, repositories);
  },
};
