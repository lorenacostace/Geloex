'use strict';

class ExamRepository {
  constructor(repository) {
    this.repository = repository;
  }

  createExam(examData) {
    return this.repository.createExam(examData);
  }

  deleteExam(id) {
    return this.repository.deleteExam(id);
  }

  existExam(dataExam) {
    return this.repository.existExam(dataExam);
  }

  getExam(id) {
    return this.repository.getExam(id);
  }

  updateExam({ examData }) {
    return this.repository.updateExam({ examData });
  }
}

module.exports = ExamRepository;
