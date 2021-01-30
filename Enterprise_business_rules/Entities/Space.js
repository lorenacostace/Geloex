'use strict';

const ResponseError = require('../Manage_error/ResponseError');
const { TYPES_ERROR } = require('../Manage_error/codeError');

module.exports = class {
  constructor({ spaceData }) {
    const { name, numRows, numSeats, isLab } = spaceData;
    this.name = name;
    this.numRows = numRows;
    this.numSeats = numSeats;
    this.isLab = isLab;
  }

  getId() {
    if (this.id) {
      return this.id;
    }
    throw new ResponseError(TYPES_ERROR.ERROR, 'Es necesario al menos un parámetro para actualizar', 'incomplete_data');
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

  setId(id) {
    this.id = id;
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
