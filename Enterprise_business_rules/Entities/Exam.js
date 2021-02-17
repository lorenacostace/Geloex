const { STATE } = require('../constant');

class Exam {
  constructor(examData) {
    const { subject, group, teacher, year, month, day, hour, minutes, space } = examData;
    const date = { year, month, day, hour, minutes };

    this.subject = subject;
    this.group = group;
    this.teacher = teacher;
    this.space = space;
    this.date = new Date(year, month, day, hour, minutes, 0);
    this.state = STATE.ToDo;
  }

  getSubject() {
    return this.subject;
  }

  getTeacher() {
    return this.teacher;
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

  toJSON() {
    return {
      subject: this.subject,
      group: this.group,
      dateExam: this.date,
      teacher: this.email,
      space: this.role,
      state: this.state,
    };
  }
}

module.exports = Exam;
