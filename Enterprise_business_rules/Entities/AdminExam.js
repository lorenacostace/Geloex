'use strict';

const User = require('./User');
const { ROLES } = require('../constant');

class AdminExam extends User {
  constructor({ userData }) {
    super({
      userData: {
        ...userData,
        role: ROLES.ADMIN_EXAM,
      },
    });
  }
}

module.exports = AdminExam;
