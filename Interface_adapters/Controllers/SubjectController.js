const SubjectRepository = require('../../Enterprise_business_rules/Repositories/SubjectRepository');
const SubjectRepositoryMySQL = require('../../Frameworks_drivers/Storage/MySQL/SubjectRepositoryMySQL');

const CreateSubject = require('../../Application_business_rules/Use_cases/Subject/CreateSubject');
const ListSubjects = require('../../Application_business_rules/Use_cases/Subject/ListSubjects');
const GetSubject = require('../../Application_business_rules/Use_cases/Subject/GetSubject');
const DeleteSubject = require('../../Application_business_rules/Use_cases/Subject/DeleteSubject');
const UpdateSubject = require('../../Application_business_rules/Use_cases/Subject/UpdateSubject');

const subjectRepositoryMySQL = new SubjectRepository(new SubjectRepositoryMySQL());

module.exports = {
  createSubject(name) {
    return CreateSubject(name, { subjectRepositoryMySQL });
  },

  async listSubjects() {
    return ListSubjects({ subjectRepositoryMySQL });
  },

  async getSubject(id) {
    return GetSubject(id, { subjectRepositoryMySQL });
  },

  async deleteSubject(id) {
    return DeleteSubject(id, { subjectRepositoryMySQL });
  },

  async updateSubject({ subjectData }) {
    return UpdateSubject({ subjectData }, { subjectRepositoryMySQL });
  },
};
