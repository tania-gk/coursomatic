//service constructor
coursoramaApp.factory("Course", function () {
    function Course(plainObject) {
            this.name = plainObject.name;
            this.desc = plainObject.desc;
            this.dates = plainObject.dates;
            this.students = plainObject.students;
            this.sessionsData = plainObject.sessionsData;
            this.maxStudents = "12";
    };
    return Course;
});

 // Service that manages courses
coursoramaApp.factory("selectedCourse", function () {
    var course = null;

    var isSelectedCourse = function () {
        return course ? true : false;
    };

    var selectCourse = function (selectedCourse) {
        course = selectedCourse;
    };

    var get = function () {
        return course;
    };

    var addStudentToCourse = function (selectedCourse, student){
        if (selectedCourse.students.length < selectedCourse.maxStudents) {
            selectedCourse.students.push(student.id);
        } else {
            alarm("selectedCourse.get().name" + " is full");
        }
    };

    var removeStudentFromCourse = function (selectedCourse, student){
        var index = selectedCourse.students.indexOf(student.id);
        if (index != -1) {
            selectedCourse.students.splice(index,1);
        } else {
            alarm("student.name" + " is not in registered to this course");
        }
    };

    return {
        isSelectedCourse: isSelectedCourse,
        selectCourse: selectCourse,
        get: get,
        addStudentToCourse: addStudentToCourse,
        removeStudentFromCourse:removeStudentFromCourse
    };
});