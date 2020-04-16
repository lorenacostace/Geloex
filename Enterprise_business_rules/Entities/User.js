'use strict';

class User {
    constructor(name, fSurname, sSurname, email) {
        this.name = name;
        this.fSurname = fSurname;
        this.sSurname = sSurname;
        this.email = email;
    }
    getName() {
        return this.name;
    }

    getFSurname() {
        return this.fSurname;
    }

    getSSurname() {
        return this.sSurname;
    }

    getEmail() {
        return this.email;
    }

    setName(name) {
        this.name = name;
    }

    setFSurname(fSurname) {
        this.fSurname = fSurname;
    }

    setSSurname(sSurname) {
        this.sSurname = sSurname;
    }

    setEmail(email) {
        this.email = email;
    }
}

module.exports = User;