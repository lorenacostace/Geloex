'use strict';

const User = require('./User');

class Student extends User {
  constructor({ userData }) {
    super({ userData });
  }
}

module.exports = Student;
