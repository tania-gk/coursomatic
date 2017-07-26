//service constructor
coursoramaApp.factory("Course", function () {
    function Course(plainObject) {
        this.id = plainObject.id;
        this.name = plainObject.name;
        this.schedule = plainObject.schedule;
        this.dates = plainObject.dates;
        this.students = plainObject.students;
        this.alternativeStudents = plainObject.alternativeStudents;
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

    return {
        isSelectedCourse: isSelectedCourse,
        selectCourse: selectCourse,
        get: get
    };
});