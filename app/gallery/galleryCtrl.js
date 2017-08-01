coursomaticApp.controller("GalleryCtrl", function ($scope, $http, $location,Course, Courses, activeUser, allSessions) {
    $http.get("data/courses.json").then(function (response) {
        var coursesIndex = Object.keys(response.data);
        if (Courses.getAll().length === 0) {
            for (var i = 0; i < coursesIndex.length; i++) {
            Courses.add(new Course(response.data[coursesIndex[i]],coursesIndex[i]));
            }
        }
    }); 

    $scope.courses = Courses.getAll();
    
    $scope.allSessionsArr = allSessions.getAllSessionsArr();
 
    $scope.loggedUser = activeUser.get();
});

