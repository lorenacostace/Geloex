'use strict';

class Exam  {
    constructor(subject, year, teacher) {
        this.subject = subject;
        this.year = year;
        this.teacher = teacher;
    }

    getSubject() {
        return this.subject;
    }

    getYear() {
        return this.year;
    }

    getStartTime() {
        return this.startTime;
    }

    getDuration() {
        return this.duration;
    }

    getTeacher() {
        return this.teacher;
    }

    setSubject (subject) {
        this.subject = subject;
    }

    setYear(year) {
        this.year = year;
    }

    setStartTime(startTime) {
        this.startTime = startTime;
    }

    setDuration(duration) {
        this.duration= duration;
    }

    setTeacher(teacher) {
        this.teacher = teacher;
    }
}

module.export = Exam;