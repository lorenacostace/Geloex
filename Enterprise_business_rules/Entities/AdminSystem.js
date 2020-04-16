'use strict';

const User = require('./User');

class AdminSystem extends User {
    constructor(name, fSurname, sSurname) {
        super(name, fSurname, sSurname);
    }
}

module.exports = AdminSystem;