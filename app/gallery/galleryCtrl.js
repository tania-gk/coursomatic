coursomaticApp.controller("GalleryCtrl", function($scope, $http, $location, uiCalendarConfig, Course, Courses, activeUser, allSessions, Sessions) {
    $scope.events = [];
    $scope.SelectedEvent;
    $scope.eventSources = [{
        events: $scope.events,
        color: '#428bca',
        textColor: 'white',
        overlap: false
    }];

    var isFirstTime = true;


    if (!Courses.isLoaded) {
        $http.get("data/courses.json").then(function(response) {
            var coursesIndex = Object.keys(response.data);
            for (var i = 0; i < coursesIndex.length; i++) {
                Courses.add(new Course(response.data[coursesIndex[i]], coursesIndex[i]));
            }
            $scope.events.splice(0);
            for (var i = 0; i < allSessions.getAllSessionsArr().length; i++) {
                $scope.events.push({
                    "title": allSessions.getAllSessionsArr()[i].title,
                    "start": allSessions.getAllSessionsArr()[i].start,
                    "end": allSessions.getAllSessionsArr()[i].end
                })
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
    /*
        $scope.filterByName = function(session) {
            if ($scope.sessionFilter.value === "all" ||
                localStorage.loggedInUser.type === "teacher" ||
                ($scope.sessionFilter.value === "my" && session.title.toLowerCase().indexOf(localStorage.loggedInUser.courseId) != -1) ||
                ($scope.sessionFilter.value === "other" && session.title.toLowerCase().indexOf(localStorage.loggedInUser.courseId) == -1)) {
                return true;
            } else {
                return false;
            }
        };
    */
    $scope.addUser = function(session) {
        Sessions.addUserToSession(session);
    }

    $scope.removeUser = function(session) {
        Sessions.removeUserFromSession(session);
    }

    $scope.sessionFilter = function() {
            var course = document.getElementById('selCourse');
            var courseName = course.getElementsByTagName('h4').innerHTML;
            return sessionStorage.title === courseName;
        }
        //configure calendar
    $scope.uiConfig = {
        calendar: {
            height: 546,
            editable: true,
            displayEventTime: false,
            header: {
                left: 'month basicWeek agendaDay',
                center: 'title',
                right: 'today prev,next'
            },
            renderEvents: function() {
                uiCalendarConfig.calendars.myCalendar.fullCalendar('renderEvents', $scope.events, true);
            },
            eventClick: function(event) {
                $scope.SelectedEvent = event;
            },
            eventAfterAllRender: function() {
                if ($scope.events.length > 0 && isFirstTime) {
                    //focus on first event
                    uiCalendarConfig.calendars.myCalendar.fullCalendar('goToDate', $scope.events[0].start);
                }
            }
        }
    }
});