coursomaticApp.controller("GalleryCtrl", function ($scope, $http, $location, User,Course, activeUser, Session, allSessions) {
    $http.get("data/courses.json").then(function (response) {
        $scope.courses = [];
        var coursesIndex = Object.keys(response.data);
        for (var i = 0; i < coursesIndex.length; i++) {
           $scope.courses.push(new Course(response.data[coursesIndex[i]],coursesIndex[i]));
        }
        console.log($scope.courses);
   }
    
    );

   $scope.sessionsArr = function() {
       return allSessions.getAllSessionsArr();
    };

    $scope.getUser = function () {
        console.log(activeUser.get());
        return activeUser.get();
    };
});

