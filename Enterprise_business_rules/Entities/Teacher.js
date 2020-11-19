'use strict';

const User = require('./User');
const { ROLES } = require('../constant');

class Teacher extends User {
  constructor({ userData }) {
    super({
      userData: {
        ...userData,
        role: ROLES.TEACHER,
      },
    });
  }
}

module.exports = Teacher;
