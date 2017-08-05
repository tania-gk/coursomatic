coursomaticApp.controller("StudentListCtrl", function($scope, $location, Users) {
    $scope.userList = Users.getAllUsers();
});