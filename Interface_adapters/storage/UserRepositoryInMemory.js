'use strict';

const User = require('../../Enterprise_business_rules/Entities/User');

class UserRepositoryInMemory {
    _initializeRepositoryWithFourUsers() {
        const alba = new User(null, 'Alba', 'Guau', 'alba.guau@mail.com', 'Profesor');
        const jorge = new User(null, 'Jorge', 'Xtrem', 'jorge.xtrem@mail.com', 'Alumno');
        const lorena = new User(null, 'Lorena', 'Miau', 'lorena.miau@mail.com', 'AdminS');
        const beatriz = new User(null, 'Beatriz', 'Vader', 'beatriz.vader@mail.com', 'AdminE');
        this.persist(lorena)
            .then(() => this.persist(jorge))
            .then(() => this.persist(beatriz))
            .then(() => this.persist(alba));
    }

    _dataAsArray() {
        return Object.keys(this.data).map(key => this.data[key]);
    }

    constructor() {
        this.index = 1;
        this.data = {};
        this._initializeRepositoryWithFourUsers();
    }

    persist(userEntity) {
        const row = Object.assign({}, userEntity);
        const rowId = this.index++;
        row.id = rowId;
        this.data[rowId] = row;
        return Promise.resolve(row);
    }

    merge(userEntity) {
        let row = this.data[userEntity.id];
        Object.assign(row, userEntity);
        return Promise.resolve(row);
    }

    remove(userId) {
        delete this.data[userId];
        return Promise.resolve();
    }

    get(userId) {
        return Promise.resolve(this.data[userId]);
    }

    getByEmail(userEmail) {
        const users = this._dataAsArray();
        return Promise.resolve(users.find(user => user.email === userEmail));
    }

    find() {
        return Promise.resolve(this._dataAsArray());
    }
}

module.exports = UserRepositoryInMemory;