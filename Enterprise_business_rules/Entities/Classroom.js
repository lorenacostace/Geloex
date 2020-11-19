
// eslint-disable-next-line no-unused-vars
class Classroom {
  constructor({ name, teacher, students }) {
    this.name = name;
    this.teacher = teacher;
    this.students = students;
  }

  getName() {
    return this.name;
  }

  getTeacher() {
    return this.teacher;
  }

  getStudents() {
    return this.students;
  }
}
