var coursomaticApp = angular.module("coursomaticApp", ["ngRoute", "ngAnimate", "ui.bootstrap", "ui.calendar","dndLists"]);


coursomaticApp.config(function($routeProvider) {
    $routeProvider
         .when("/", {
             templateUrl: "app/home/home.html",
             controller: "HomeCtrl"
         })
        .when("/home", {
            controller: "LoginCtrl"
        })
        .when("/teacherGallery", {
            templateUrl: "app/teacherGallery/teacherGallery.html",
            controller: "TeacherGalleryCtrl"
        })
        .when("/gallery", {
            templateUrl: "app/gallery/gallery.html",
            controller: "GalleryCtrl"
        })
        .when("/newStudent", {
            templateUrl: "app/newUser/newUser.html",
            controller: "NewUserCtrl"
        })
        .when("/newStudent/:firstName/:lastName/:phone/:city/:email", {
            templateUrl: "app/newUser/newUser.html",
            controller: "NewUserCtrl"
        })
        .when("/studentList", {
            templateUrl: "app/studentList/studentList.html",
            controller: "StudentListCtrl"
        })
});

coursomaticApp.controller("MainCtrl", function($scope, $uibModal, $http, User, Users, activeUser) {
    /*    $scope.greetName = activeUser.get().firstName;*/

    $http.get("data/users.json").then(function(response) {
       
        if (!Users.isLoaded) {
            for (var i = 0; i < response.data.length; i++) {
                Users.addUser(new User(response.data[i]));
            }
            Users.isLoaded = true;
        }
    });

    $scope.login = function() {
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