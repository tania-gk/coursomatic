//service constructor
coursoramaApp.factory("Course", function () {
    function Course(plainObject) {
            this.name = plainObject.name;
            this.desc = plainObject.desc;
            this.dates = plainObject.dates;
            this.students = plainObject.students;
            this.sessionsData = plainObject.sessionsData;
            this.maxStudents = plainObject.maxStudents;
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
            alert("selectedCourse.get().name" + " is full");
        }
    };

    var removeStudentFromCourse = function (selectedCourse, student){
        var index = selectedCourse.students.indexOf(student.id);
        if (index != -1) {
            selectedCourse.students.splice(index,1);
        } else {
            alert("student.name" + " is not in registered to this course");
        }
    };

    var addStudentToSessionList = function (selectedCourse, student, sessionId) {

        if (selectedCourse.students.length < selectedCourse.maxStudents || 
            (selectedCourse.students.length === selectedCourse.maxStudents 
                &&  selectedCourse.sessionsData[sessionId].removed.length > 0 
                && selectedCourse.sessionsData[sessionId].removed.length > selectedCourse.sessionsData[sessionId].added.length)) {
                    selectedCourse.sessionsData[sessionId].added.push(student.id);
        } else {
            alert("There is no free spot in this session of " + selectedCourse.name);
        }
    };

    var removeStudentFromSessionList = function (selectedCourse, student, sessionId) {

        if (selectedCourse.students.indexOf(student.id) != -1) {
                    selectedCourse.sessionsData[sessionId].removed.push(student.id);
        } else {
            alert(student.firstName + " is not registered to " + selectedCourse.name + " Course");
        }
    };


    return {
        isSelectedCourse: isSelectedCourse,
        selectCourse: selectCourse,
        get: get, 
        addStudentToCourse: addStudentToCourse,
        removeStudentFromCourse: removeStudentFromCourse,
        addStudentToSessionList: addStudentToSessionList,
        removeStudentFromSessionList: removeStudentFromSessionList
    };
});