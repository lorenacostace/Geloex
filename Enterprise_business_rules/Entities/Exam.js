
class Exam {
  constructor({ subject, teacher, group }) {
    this.teacher = teacher;
    this.subject = subject;
    this.students = null;
    this.space = null;
    this.date = null;
    this.group = group;
    this.state = null;
  }

  getSubject() {
    return this.subject;
  }

  getTeacher() {
    return this.teacher;
  }

  getStudents() {
    return this.students;
  }

  getGroup() {
    return this.group;
  }

  getDate() {
    return this.date;
  }

  getSpace() {
    return this.space;
  }

  getStatus() {
    return this.status;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  setTeacher(teacher) {
    this.teacher = teacher;
  }

  setStudents(students) {
    this.teacher = students;
  }

  setGroup(group) {
    this.group = group;
  }

  setDate(date) {
    this.date = date;
  }

  setSpace(space) {
    this.space = space;
  }

  setStatus(status) {
    this.status = status;
  }
}

module.exports = Exam;
