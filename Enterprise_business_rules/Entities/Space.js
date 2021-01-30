'use strict';

module.exports = class {
  constructor({ spaceData }) {
    const { id, name, numRows, numSeats, isLab } = spaceData;
    this.id = id;
    this.name = name;
    this.numRows = numRows;
    this.numSeats = numSeats;
    this.isLab = isLab;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
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

  setName(name) {
    this.name = name;
  }

  setRows(numRows) {
    this.numRows = numRows;
  }

  setSeats(numSeats) {
    this.numSeats = numSeats;
  }

  setisLab(islab) {
    this.isLab = islab;
  }

  toJSON() {
    return {
      name: this.name,
      numRows: this.numRows,
      numSeats: this.numSeats,
      isLab: this.isLab,
    };
  }
};
