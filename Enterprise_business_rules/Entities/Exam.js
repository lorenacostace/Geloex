
class Exam {
  constructor({ subject, teacher, students }) {
    this.teacher = teacher;
    this.subject = subject;
    this.students = students;
    this.space = null;
    this.date = null;
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

  setSubject(subject) {
    this.subject = subject;
  }

  setTeacher(teacher) {
    this.teacher = teacher;
  }

  setStudents(students) {
    this.teacher = students;
  }
}

module.exports = Exam;
