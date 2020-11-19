'use strict';

module.exports = class {
  constructor(id = null, numRows, numSeats, isLab) {
    this.id = id;
    this.numRows = numRows;
    this.numSeats = numSeats;
    this.isLab = isLab;
  }

  getId() {
    return this.id;
  }

  getRows() {
    return this.numRows;
  }

  getNumSeats() {
    return this.numSeats;
  }

  isLab() {
    return this.isLab;
  }

  setRows(numRows) {
    this.numRows = numRows;
  }

  setSeats(numSeats) {
    this.numSeats = numSeats;
  }
};
