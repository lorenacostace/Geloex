'use strict';

const User = require('./User');

class AdminExam extends User {
    constructor(name, fSurname, sSurname) {
        super(name, fSurname, sSurname);
    }
}

module.exports = AdminExam;