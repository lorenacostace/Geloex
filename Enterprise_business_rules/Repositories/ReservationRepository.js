'use strict';

class ReservationRepository {
  constructor(repository) {
    this.repository = repository;
  }

  addReservation(reservationData) {
    return this.repository.addReservation(reservationData);
  }
}

module.exports = ReservationRepository;
