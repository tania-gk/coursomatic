var coursoramaApp = angular.module("coursoramaApp", ["ngRoute", "ngAnimate", "ui.bootstrap"]);

coursoramaApp.controller("MainCtrl", function ($scope,User,activeUser){
    var fixedUser = {
    "id":"0",
    "firstName":"Sigal",
    "lastName":"Yaron",
    "phone":"0545723644",
    "city":"Holon",
    "email":"sigalyaron10@gmail.com",
    "password":"11111",
    "type":"teacher",
    "course":""
    };
    var myUser = fixedUser;
    console.log(JSON.stringify(myUser));
     console.log(activeUser.isLoggedIn());
     activeUser.login(myUser);
     console.log(JSON.stringify(activeUser.get()));
     console.log(activeUser.isLoggedIn());
     activeUser.logout();
     console.log(activeUser.isLoggedIn());

});