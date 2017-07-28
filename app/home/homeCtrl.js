coursomaticApp.controller("HomeCtrl", function ($scope, $uibModal) {
    $scope.login = function() {
        $uibModal.open({
            templateUrl: "model/login/login.html",
            controller: "LoginCtrl"
        })
    }
});