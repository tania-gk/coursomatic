coursomaticApp.controller("TeacherGalleryCtrl", function($scope, $http, $location, Users, Course, Courses, activeUser, allSessions, Sessions) {
    $scope.isCollapsed = false;
    $scope.isCollapsedDetails = false;
    $scope.sessionDate = "";
    $scope.sessionTitle = "";
    $scope.sessionStart = "";
    $scope.registeredStudents = [];
    $scope.removedStudents = [];
    $scope.addedStudents = [];
    $scope.selectedSession = {};
    $scope.courseFilter = "all";


    if (!Courses.isLoaded) {
        $http.get("data/courses.json").then(function(response) {
            var coursesIndex = Object.keys(response.data);
            for (var i = 0; i < coursesIndex.length; i++) {
                Courses.add(new Course(response.data[coursesIndex[i]], coursesIndex[i]));
            }
            $scope.courses = Courses.getAll();
            $scope.allSessionsArr = allSessions.getAllSessionsArr();
            $scope.loggedUser = activeUser.get();
            Courses.isLoaded = true;
        })
    } else {
        $scope.courses = Courses.getAll();
        $scope.allSessionsArr = allSessions.getAllSessionsArr();
        $scope.loggedUser = localStorage.loggedInUser;
   }

   

    $scope.selectSession = function(session) {
        $scope.sessionTitle = session.title;
        $scope.sessionDate =session.start.getUTCDate() +" "+ session.month;
        $scope.sessionStart = session.start.toLocaleTimeString();
        $scope.registeredStudents = session.students;
        $scope.removedStudents = session.removed;
        $scope.addedStudents = session.added;
        $scope.selectedSession = session;
    }
    
    $scope.userList = Users.getAllUsers();

    $scope.addUser = function() {
        Sessions.addUserToSession($scope.selectedSession);
        $scope.addedStudents = $scope.selectedSession.added;
    }

    $scope.removeUser = function() {
        Sessions.removeUserFromSession($scope.selectedSession);
        $scope.removedStudents = $scope.selectedSession.removed;
    }

    $scope.sessionFilter = function() {
            var course = document.getElementById('selCourse');
            var courseName = course.getElementsByTagName('h4').innerHTML;
            return sessionStorage.title === courseName;
        }

    // $scope.allowD = function (ev) {
    //     ev.preventDefault();
    // }

    // $scope.drag = function (ev) {
    //     ev.dataTransfer.setData("text", ev.target.id);
    // }

    // $scope.drop = function (ev) {
    //     ev.preventDefault();
    //     var data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    // }

});