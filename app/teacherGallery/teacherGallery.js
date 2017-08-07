coursomaticApp.controller("TeacherGalleryCtrl", function($scope, $http, $location, uiCalendarConfig, Users, Course, Courses, activeUser, allSessions, Sessions) {
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
            // $scope.events.splice(0);
            // for (var i = 0; i < allSessions.getAllSessionsArr().length; i++) {
            //     $scope.events.push({
            //         "title": allSessions.getAllSessionsArr()[i].title,
            //         "start": allSessions.getAllSessionsArr()[i].start,
            //         "end": allSessions.getAllSessionsArr()[i].end
            //     })
            //}

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

   
 
    // getCourseId = function () {
    //     for (i=0 ; i<$scope.courses.length; i++) {
    //         if ($scope.selectedSession.title === $scope.courses[i].name) {
    //             return $scope.courses[i].id;
    //         }
    //     }
    //     return -1;
    // }

    $scope.selectSession = function(session) {
        $scope.sessionTitle = session.title;
        $scope.sessionDate =session.start.getUTCDate() +" "+ session.month;
        $scope.sessionStart = session.start.toLocaleTimeString();
        $scope.registeredStudents = session.students;
        $scope.removedStudents = session.removed;
        $scope.addedStudents = session.added;
        $scope.selectedSession = session;
        // document.getElementById("sessionDetails").className.splice(document.getElementById("sessionDetails").className.indexOf("ng-hide", 7));
        // document.getElementById("sessionDetails").className.concat("ng-show");
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

    $scope.allowDrop = function (ev) {
        ev.preventDefault();
    }

    $scope.drag = function (ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    $scope.drop = function (ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

});