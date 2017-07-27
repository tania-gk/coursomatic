//service constructor
coursoramaApp.factory("Course", function () {
    function Course(plainObject) {
            this.name = plainObject.name;
            this.desc = plainObject.desc;
            this.dates = plainObject.dates;
            this.students = plainObject.students;
            this.sessionsData = plainObject.sessionsData;
    };
    return Course;
});

 // Service that manges users
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

 /*   var addToStudents = function (selectedCourse, student){
        if (selectedCourse.get().students.length < 12) {
            selectCourse.get().students.push(student);
        } else {
            alarm("selectedCourse.get().name" + " is full");
        }
    };

    var addToStudents = function (selectedCourse, student){
        if (selectedCourse.get().students.length < 12) {
            selectCourse.get().students.push(student);
        } else {
            alarm("selectedCourse.get().name" + " is full");
        }
    };*/

    return {
        isSelectedCourse: isSelectedCourse,
        selectCourse: selectCourse,
        get: get/*,
        addToStudents: addToStudents*/
    };
});