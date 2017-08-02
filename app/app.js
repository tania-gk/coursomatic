var coursomaticApp = angular.module("coursomaticApp", ["ngRoute", "ngAnimate", "ui.bootstrap"]);


 coursomaticApp.config(function ($routeProvider) {
     $routeProvider
         .when("/", {
             templateUrl: "app/home/home.html",
             controller: "HomeCtrl"
         })
        .when("/home",{
            controller: "LoginCtrl"
        })
         .when("/gallery", {
             templateUrl: "app/gallery/gallery.html",
             controller: "GalleryCtrl"
         })
            .when("/newUser", {
             templateUrl: "app/newUser/newUser.html",
             controller: "NewUserCtrl"            
         })

 });

coursomaticApp.controller("MainCtrl", function ($scope, $uibModal,$http, User, Users, activeUser) {
/*    $scope.greetName = activeUser.get().firstName;*/

    $http.get("data/users.json").then(function (response) {
        if (Users.getAllUsers().length === 0) {
            for (var i = 0; i < response.data.length; i++) {
                Users.addUser(new User(response.data[i]));
            }
        }
    });

    $scope.login = function () {
        $uibModal.open({
            templateUrl: "app/login/login.html",
            controller: "LoginCtrl"
        })
    };

    $scope.isLoggedIn = function() {
        return activeUser.isLoggedIn();
    };

    $scope.isTeacher = function() {
        return activeUser.isTeacher();
    };

    $scope.logout = function() {
        return activeUser.logout();
    };

    $scope.userName = function() {
        return activeUser.get().firstName + " " + activeUser.get().lastName;
    }
});