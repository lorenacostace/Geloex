'use strict';

class ExamRepository {
  constructor(repository) {
    this.repository = repository;
  }

  createExam(examData) {
    return this.repository.createExam(examData);
  }
}

module.exports = ExamRepository;
