'use strict';

const User = require('./User');

class Teacher extends User {
    constructor(name, fSurname, sSurname, subjects) {
        super(name, fSurname, sSurname);
        this.subjects = subjects;
    }
    getSubjects() {
        return this.subjects;
    }
    setSubjects(subjects) {
        this.subjects = subjects;
    }
}

module.exports = Teacher;