'use strict';

class InscribedRepository {
  constructor(repository) {
    this.repository = repository;
  }

  createInscribed(inscribedData) {
    return this.repository.createInscribed(inscribedData);
  }

  deleteInscribed(inscribedData) {
    return this.repository.deleteInscribed(inscribedData);
  }

  getListInscribed(ExamId) {
    return this.repository.getListInscribed(ExamId);
  }

  getInscribed(UserId) {
    return this.repository.getInscribed(UserId);
  }

  isInscribed(inscribedData) {
    return this.repository.isInscribed(inscribedData);
  }
}

module.exports = InscribedRepository;
