//service constructor
coursomaticApp.factory("Course", function (Session) {
    function Course(plainObject, index) {
            this.id = index;
            this.name = plainObject.name;
            this.desc = plainObject.desc;
            this.dates = plainObject.dates;
            this.students = plainObject.students;
            this.sessionsData = getSessions(plainObject.sessionsData, plainObject.name,plainObject.students);
            this.courseUrl = plainObject.courseUrl;
            this.maxStudents = plainObject.maxStudents;
    };

    getSessions = function (plainObject, courseName, students) {
        var sessions = [];
        var sessionsIndex = Object.keys(plainObject);
        for (var i = 0; i < sessionsIndex.length; i++) {
           sessions.push(new Session(plainObject[sessionsIndex[i]],sessionsIndex[i],courseName, students));
        }
       return sessions;
    };

    return Course;
 });



 // Service that manages courses
coursomaticApp.factory("selectedCourse", function (activeUser) {
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

coursomaticApp.factory("Courses", function (Course) {
    var coursesList = [];
    var isLoaded = false;

    var add = function (course) {
        coursesList.push(course);
    }

    var getAll = function() {
        return coursesList;
    }

    var get = function(index) {
        for (var i=0; i < coursesList.length; i++) {
            if (coursesList[i].id === index) {
                return coursesList[i];
            }
        }
        return null;
    }

    var remove = function(course) {
        for (var i=0; i < coursesList.length; i++) {
            if (coursesList[i].id === index) {
                coursesList.splice(i,1);
            }
        }
    }

    var showUserCourses = function(activeUser) {

    }

    return {
        add : add,
        get : get,
        getAll : getAll,
        remove : remove
    }
    
});