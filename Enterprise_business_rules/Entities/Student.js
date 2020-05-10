'use strict';

const User = require('./User');

class Student extends User {
  constructor(name, fSurname, sSurname, subjects) {
    super(name, fSurname, sSurname);
    this.subjects = subjects;
  }

  getSubjects() {
    return this.subjects;
  }
}

module.exports = Student;
