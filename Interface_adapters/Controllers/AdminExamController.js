const CreateAdminExam = require('../../Application_business_rules/Use_cases/AdminExam/CreateAdminExam');

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
};
