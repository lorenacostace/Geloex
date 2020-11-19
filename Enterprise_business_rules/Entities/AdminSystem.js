'use strict';

const User = require('./User');

class AdminSystem extends User {
  constructor({ userData }) {
    super({ userData });
  }
}

module.exports = AdminSystem;
