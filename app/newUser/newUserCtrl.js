coursomaticApp.controller("NewUserCtrl", function($scope, $http, $location, $routeParams ,User, activeUser, Users, Course, Courses) {
    $scope.title = $routeParams.firstName == undefined ? "New Student" : "Update Student";
    $scope.buttonName = $routeParams.firstName == undefined ? "Save" : "Update";
    
    $scope.usrFirstName = $routeParams.firstName;
    $scope.usrLastName = $routeParams.lastName; 
    $scope.usrPhone = $routeParams.phone; 
    $scope.usrCity = $routeParams.city; 
    $scope.usrEmail = $routeParams.email; 
    
    
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
        if ($routeParams.firstName === undefined) {
            Users.addUser($scope.newUser);
        } else {
            var userArr = Users.getAllUsers();
            for(i=0; i<userArr.length; i++) {
                if (userArr[i].email === $scope.usrEmail) {
                    if($scope.newUser.firstName === undefined) {
                        $scope.newUser.firstName = $scope.usrFirstName;
                    }
                    if($scope.newUser.lastName === undefined) {
                        $scope.newUser.lastName = $scope.usrLastName;
                    }
                    if($scope.newUser.phone === undefined) {
                        $scope.newUser.phone = $scope.usrPhone;
                    }
                    if($scope.newUser.city === undefined) {
                        $scope.newUser.city = $scope.usrCity;
                    }
                    if($scope.newUser.email === undefined) {
                        $scope.newUser.email = $scope.usrEmail;
                    }
                    
                    Users.updateUser(i,$scope.newUser);
                }
            }
        }
        $location.path("/studentList");
    }
});