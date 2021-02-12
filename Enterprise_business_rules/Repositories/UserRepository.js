'use strict';

class UserRepository {
  constructor(repository) {
    this.repository = repository;
  }

  addRole({ roleData }) {
    return this.repository.addRole({ roleData });
  }

  createUser({ userData }) {
    return this.repository.createUser({ userData });
  }

  deleteUser(id) {
    return this.repository.deleteUser(id);
  }

  deleteRole({ roleData }) {
    return this.repository.deleteRole({ roleData });
  }

  getListUsers() {
    return this.repository.getListUsers();
  }

  getByEmail(email) {
    return this.repository.getByEmail(email);
  }

  getRole({ userRoleData }) {
    return this.repository.getRole({ userRoleData });
  }

  getUser(id) {
    return this.repository.getUser(id);
  }

  modifyRole({ userRoleData }) {
    return this.repository.modifyRole({ userRoleData });
  }

  updateUser({ teacherData }) {
    return this.repository.updateUser({ teacherData });
  }

  userRoles(id) {
    return this.repository.userRoles(id);
  }
}

module.exports = UserRepository;
