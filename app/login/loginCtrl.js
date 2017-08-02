coursomaticApp.controller("LoginCtrl", function ($scope, $uibModalInstance, $http, $location, activeUser, User,Users) {

    $scope.failedAttempt = false;

    $scope.login = function() {
        var user = getLoggedInUser();
        if (user != null) {
            activeUser.login(user);
            $uibModalInstance.close("Logged-in");
            $location.path("/gallery")
        } else {
            console.log(JSON.stringify(user));
            $scope.failedAttempt = true;
        }
    }

    var getLoggedInUser = function() {
        var usersArr = Users.getAllUsers();
        for (var i = 0; i < usersArr.length; i++) {
            if (usersArr[i].email === $scope.email && usersArr[i].password === $scope.password) {
                return usersArr[i];
            }
        }
        return null;
    }

    $scope.dismiss = function () {
        $uibModalInstance.close("User dismissed");
    }
 });
