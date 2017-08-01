coursomaticApp.controller("NewUserCtrl", function ($scope, User, activeUser) {
    $scope.User = new User({});

    $scope.cancel = function () {
        $location.path("/recipes");
    }
/*
    $scope.newUser = function () {
        Users.addUser($scope.recipe);
        $location.path("/recipes");
    }$scope.saveUser = function () {
        return activeUser.login();
    }*/
});