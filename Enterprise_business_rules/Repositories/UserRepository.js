'use strict';

class UserRepository {
  constructor(repository) {
    this.repository = repository;
  }

  createUser({ teacherData }) {
    return this.repository.createUser({ teacherData });
  }

  deleteUser(id) {
    return this.repository.deleteUser(id);
  }

  getListUsers() {
    return this.repository.getListUsers();
  }

  updateUser({ teacherData }) {
    return this.repository.updateUser({ teacherData });
  }

  getByEmail(email) {
    return this.repository.getByEmail(email);
  }

  getUser(id) {
    return this.repository.getUser(id);
  }
}

module.exports = UserRepository;
