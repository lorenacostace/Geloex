'use strict';

const User = require('./User');
const { ROLES } = require('../constant');

class AdminSystem extends User {
  constructor({ userData }) {
    super({
      userData: {
        ...userData,
        role: ROLES.ADMIN_SYS,
      },
    });
  }
}

module.exports = AdminSystem;
