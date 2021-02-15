'use strict';

const User = require('./User');
const { ROLES } = require('../constant');

class Student extends User {
  constructor(userData) {
    super({
      userData: {
        ...userData,
        role: ROLES.STUDENT,
      },
    });
  }
}

module.exports = Student;
