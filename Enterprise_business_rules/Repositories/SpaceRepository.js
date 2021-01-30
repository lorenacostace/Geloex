'use strict';

class SpaceRepository {
  constructor(repository) {
    this.repository = repository;
  }

  createSpace({ spaceData }) {
    return this.repository.createSpace({ spaceData });
  }

  getSpaces() {
    return this.repository.getSpaces();
  }

  getName(name) {
    return this.repository.getName(name);
  }
}

module.exports = SpaceRepository;
