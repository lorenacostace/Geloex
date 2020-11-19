
class User {
  constructor({ userData }) {
    const {
      name, fSurname, sSurname, email, role,
    } = userData;
    this.name = name;
    this.fSurname = fSurname;
    this.sSurname = sSurname;
    this.email = email;
    this.role = role;
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

  getFullName() {
    return `${this.getName()} ${this.getFSurname()} ${this.getSSurname()}`;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
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

  setRole(role) {
    this.role = role;
  }

  toJSON() {
    return {
      name: this.name,
      fSurname: this.fSurname,
      sSurname: this.sSurname,
      email: this.email,
      role: this.role,
    };
  }
}

module.exports = User;
