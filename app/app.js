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
         .when("/timeline", {
             templateUrl: "app/timeline/timeline.html",
             controller: "TimeLineCtrl"
         })
//            .when("/new", {
//             templateUrl: "app/recipe/newRecipe.html",
//             controller: "NewRecipeCtrl"            
//         })

 });

coursomaticApp.controller("MainCtrl", function ($scope, User, activeUser,Course,selectedCourse) {

});