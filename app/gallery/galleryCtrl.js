coursomaticApp.controller("GalleryCtrl", function($scope, $http, $location, Users, Course, Courses, activeUser, allSessions, Sessions) {
    $scope.isCollapsed = false;
    $scope.isCollapsedDetails = false;
    $scope.sessionDate = "";
    $scope.sessionTitle = "";
    $scope.sessionStart = "";
    $scope.registeredStudents = [];
    $scope.removedStudents = [];
    $scope.addedStudents = [];
    $scope.selectedSession = {};
    $scope.courseFilter = "my";

    $scope.greetingUser = localStorage.firstName;

// code for calendar 
    $scope.events = [];
    $scope.SelectedEvent;

    var isFirstTime = true;
// end code for calendar

 

    if (!Courses.isLoaded) {
        $http.get("data/courses.json").then(function(response) {
            var coursesIndex = Object.keys(response.data);
            for (var i = 0; i < coursesIndex.length; i++) {
                var newCourse = new Course(response.data[coursesIndex[i]], coursesIndex[i])
                if (activeUser.getCourseId() === newCourse.id && ($scope.courseFilter === "my" || $scope.courseFilter === "all")) {
                    newCourse.isDisabled = false;
                    newCourse.isCollapsed = true;
                } else if (activeUser.getCourseId() === newCourse.id && $scope.courseFilter === "other") {
                    newCourse.isDisabled = true;
                    newCourse.isCollapsed = false;
                } 
                Courses.add(newCourse);
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

   
 
    getCourseId = function () {
        for (i=0 ; i<$scope.courses.length; i++) {
            if ($scope.selectedSession.title === $scope.courses[i].name) {
                return $scope.courses[i].id;
            }
        }
        return -1;
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
        if (Object.keys($scope.selectedSession).length === 0) {
            alert("Please select Session")
        } else {
            Sessions.addUserToSession($scope.selectedSession);
            $scope.addedStudents = $scope.selectedSession.added;
    }
    }

    $scope.removeUser = function() {
         if (Object.keys($scope.selectedSession).length === 0) {
            alert("Please select Session")
        } else {
            Sessions.removeUserFromSession($scope.selectedSession);
            $scope.removedStudents = $scope.selectedSession.removed;
        }
    }

    $scope.sessionFilter = function() {
            var course = document.getElementById('selCourse');
            var courseName = course.getElementsByTagName('h4').innerHTML;
            return sessionStorage.title === courseName;
        }

    $scope.filterCourses = function (filter){ //filter the courses
            switch (filter) {
            case "all":
                for(i=0; i< $scope.courses.length; i++) {
                    $scope.courses[i].isDisabled = false;
                    $scope.courses[i].isCollapsed = true;
                }
            break;
            case "my":
                for(i=0; i< $scope.courses.length; i++) {
                    if (activeUser.getCourseId() === $scope.courses[i].name) {
                        $scope.courses[i].isDisabled = false;
                    } else {
                        $scope.courses[i].isDisabled = true;
                    }
                }
            break;
            case "other":
                for(i=0; i< $scope.courses.length; i++) {
                    if (activeUser.getCourseId() === $scope.courses[i].name) {
                        $scope.courses[i].isDisabled = true;
                    } else {
                        $scope.courses[i].isDisabled = false;
                    }
                }
            break;
        }
    }

    $scope.courseClick = function (course) {
        if(!course.isDisabled) { 
            course.isCollapsed = !course.isCollapsed
        }
    }
 
});