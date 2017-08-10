coursomaticApp.factory("Session", function(Users, User) {
    var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    function Session(plainObject, index, courseName, students) {
        this.title = courseName;
        this.students = students;
        this.id = index;
        this.start = new Date(plainObject.StartAt);
        this.end = new Date(plainObject.EndAt);
        this.month = monthArr[this.start.getUTCMonth()];
        this.added = plainObject.added;
        this.removed = plainObject.removed;
    };
    return Session;
});

coursomaticApp.factory("Sessions", function(User, Session) {
    var addUserToSession = function(session) {
        var user = localStorage.firstName + " " + localStorage.lastName;
        var isRegistered = false;
        var isInAdded = false;

        for (var i = 0; i < session.students.length; i++) {
            if (user.indexOf(session.students[i]) != -1) {
                isRegistered = true;
                for(var j=0; j<session.removed.length; j++ ){
                    if(session.removed[j] === user){
                        session.removed.splice(j,1);
                        isInAdded = true;                        
                    }
                } 
              }
        }
        if (isRegistered && !isInAdded){
            alert("User already registered to this Course");
        }

        if (!isRegistered) {
            for (var i = 0; i < session.added.length; i++) {
                if (user.indexOf(session.added[i]) != -1) {
                    session.added.splice(i, 1);
                }
            }
            session.added.push(user);
        }
    };

    var removeUserFromSession = function(session) {
        var user = localStorage.firstName + " " + localStorage.lastName;
        var isRegistered = false;
        var isInAdded = false;

        for (var i = 0; i < session.students.length; i++) {
            if (user.indexOf(session.students[i]) != -1) {
                isRegistered = true;
            } 
        }
        if (isRegistered) {
            for (var j = 0; j < session.removed.length; j++) {
                if (user.indexOf(session.removed[j]) != -1) {
                    session.removed.splice(j, 1);
                }
            }
            session.removed.push(user);
        } else {
            for (var i = 0; i < session.added.length; i++) {
                if (user.indexOf(session.added[i]) != -1) {
                   session.added.splice(i, 1);
                   isInAdded = true;
                }
            }
            if (!isInAdded) {
                    alert("User is not registered to this Course");
            }
        }
    }

    var teacherRemoveUserFromSession = function(session,userSelected) {
        var user = userSelected.firstName +" "+ userSelected.lastName;
        var isRegistered = false;
        var isInAdded = false;

        for (var i = 0; i < session.students.length; i++) {
            if (user.indexOf(session.students[i]) != -1) {
                isRegistered = true;
            } 
        }
        if (isRegistered) {
            for (var j = 0; j < session.removed.length; j++) {
                if (user.indexOf(session.removed[j]) != -1) {
                    session.removed.splice(j, 1);
                }
            }
            session.removed.push(user);
        } else {
            for (var i = 0; i < session.added.length; i++) {
                if (user.indexOf(session.added[i]) != -1) {
                   session.added.splice(i, 1);
                   isInAdded = true;
                }
            }
            if (!isInAdded) {
                    alert("User is not registered to this Course");
            }
        }

    };

    var teacherAddUserToSession = function(session, userSelected) {
        var user =  userSelected.firstName +" "+ userSelected.lastName;
        var isRegistered = false;
        var isInAdded = false;

        for (var i = 0; i < session.students.length; i++) {
            if (user.indexOf(session.students[i]) != -1) {
                isRegistered = true;
                for(var j=0; j<session.removed.length; j++ ){
                    if(session.removed[j] === user){
                        session.removed.splice(j,1);
                        isInAdded = true;                        
                    }
                } 
              }
        }
        if (isRegistered && !isInAdded){
            alert("User already registered to this Course");
        }

        if (!isRegistered) {
            for (var i = 0; i < session.added.length; i++) {
                if (user.indexOf(session.added[i]) != -1) {
                    session.added.splice(i, 1);
                }
            }
            session.added.push(user);
        }
    };

    
    return {
        addUserToSession: addUserToSession,
        removeUserFromSession: removeUserFromSession,
        teacherRemoveUserFromSession: teacherRemoveUserFromSession,
        teacherAddUserToSession:teacherAddUserToSession
    }
});

coursomaticApp.factory("allSessions", function(Course, Courses, Session) {
    var getAllSessionsArr = function() {
        var coursesArr = Courses.getAll();
        var j = 0;
        var k = 0;

        var allSessions = [];
        for (var i = 0; i < coursesArr.length; i++) {
            for (var j = 0; j < coursesArr[i].sessionsData.length; j++) {
                allSessions[k++] = coursesArr[i].sessionsData[j];
            }
        }
        return allSessions;
    }



    return {
        getAllSessionsArr: getAllSessionsArr,
    }
});