'use strict';

// const UserSerializer = require('../UserSerializer');
const ListUsers = require('../../Application_business_rules/use_cases/User/ListUser');
const UserRepository = require('../../Application_business_rules/repositories/UserRepository');
const UserRepositoryInMemory = require('../storage/UserRepositoryInMemory');

const userRepository = new UserRepository(new UserRepositoryInMemory());

module.exports = {
  async listUser(id, role) {
    // id, role, userRepository
    const users = await ListUsers(id, role, { userRepository });
    // console.log(users);
    return users;
  },
};
