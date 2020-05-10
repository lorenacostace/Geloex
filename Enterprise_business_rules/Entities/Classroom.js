'use strict';

module.exports = class {
  constructor(id = null, numSeats, isLab) {
    this.id = id;
    this.numSeats = numSeats;
    this.isLab = isLab;
  }
};
