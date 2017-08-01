coursomaticApp.controller("GalleryCtrl", function ($scope, $http, $location, Course) {
    $http.get("data/courses.json").then(function (response) {
        $scope.courses = [];
        var coursesIndex = Object.keys(response.data);
        for (var i = 0; i < coursesIndex.length; i++) {
           $scope.courses.push(new Course(response.data[coursesIndex[i]],coursesIndex[i]));
        }
        console.log($scope.courses);
   }
    
    );
/*
   $scope.sessionsArr = function() {
       return AllSessions.getAllSessionsArr();
    };
*/
   $scope.toTimeline = function() {
        $location.path("/timeline");
    }

});

