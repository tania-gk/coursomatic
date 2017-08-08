coursomaticApp.controller("StudentListCtrl", function($scope, $location, Users) {
    $scope.userList = Users.getAllUsers();

    $scope.removeUser = function (user) {
    var userArr = Users.getAllUsers();
    for (var i=0; i< userArr.length; i++){
        if(userArr[i] === user) {
            Users.removeUser(i);
        }
    }
    $location.path("/studentList");
    }
});