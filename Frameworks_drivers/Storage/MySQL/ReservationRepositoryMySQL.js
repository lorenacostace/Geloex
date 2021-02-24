'use strict';

const { Reservation } = require('../../ORM/sequelize');

const ResponseError = require('../../../Enterprise_business_rules/Manage_error/ResponseError');
const { TYPES_ERROR } = require('../../../Enterprise_business_rules/Manage_error/codeError');

class InscribedRepositoryMySQL {
  constructor() {
    this.model = Reservation;
  }

  async addReservation(reservationData) {
    try {
      return this.model.create(reservationData);
    } catch (err) {
      throw new ResponseError(TYPES_ERROR.FATAL, 'Fallo al crear una reserva', 'error_create_reservation');
    }
  }
}

module.exports = InscribedRepositoryMySQL;
