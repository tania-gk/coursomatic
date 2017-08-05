coursomaticApp.controller("NewUserCtrl", function($scope, $http, $location, User, activeUser, Users, Course, Courses) {
    if (!Courses.isLoaded) {
        $http.get("data/courses.json").then(function(response) {
            var coursesIndex = Object.keys(response.data);
            for (var i = 0; i < coursesIndex.length; i++) {
                Courses.add(new Course(response.data[coursesIndex[i]], coursesIndex[i]));
            }
            $scope.courses = Courses.getAll();
            $scope.loggedUser = activeUser.get();
            Courses.isLoaded = true;
        })
    } else {
        $scope.courses = Courses.getAll();
        $scope.loggedUser = localStorage.loggedInUser;
    }

    $scope.newUser = new User({});

    $scope.cancel = function() {
        $location.path("/gallery");
    }

    $scope.saveUser = function() {
        Users.addUser($scope.newUser);
        location.assign("#!/studentList")
    }
});