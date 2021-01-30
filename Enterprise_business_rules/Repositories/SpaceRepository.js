'use strict';

class SpaceRepository {
  constructor(repository) {
    this.repository = repository;
  }

  createSpace({ spaceData }) {
    return this.repository.createSpace({ spaceData });
  }

  getName(name) {
    return this.repository.getName(name);
  }
}

module.exports = SpaceRepository;
