'use strict';

const User = require('./User');

class AdminExam extends User {
  constructor({ userData }) {
    super({ userData });
  }
}

module.exports = AdminExam;
