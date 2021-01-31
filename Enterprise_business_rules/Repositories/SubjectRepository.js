'use strict';

class SubjectRepository {
  constructor(repository) {
    this.repository = repository;
  }

  createSubject(name) {
    return this.repository.createSubject(name);
  }

  deleteSubject(id) {
    return this.repository.deleteSubject(id);
  }

  getName(name) {
    return this.repository.getName(name);
  }

  getSubjects() {
    return this.repository.getSubjects();
  }

  getSubject(id) {
    return this.repository.getSubject(id);
  }

  updateSubject({ subjectData }) {
    return this.repository.updateSubject({ subjectData });
  }
}

module.exports = SubjectRepository;
