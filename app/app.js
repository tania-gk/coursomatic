var coursoramaApp = angular.module("coursoramaApp", ["ngRoute", "ngAnimate", "ui.bootstrap"]);

coursoramaApp.controller("MainCtrl", function ($scope,User,activeUser,Course){
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
    var myUser = new User(fixedUser);
    console.log(JSON.stringify(myUser));
     console.log(activeUser.isLoggedIn());
     activeUser.login(myUser);
     console.log(JSON.stringify(activeUser.get()));
     console.log(activeUser.isLoggedIn());
     activeUser.logout();
     console.log(activeUser.isLoggedIn());

        var fixedCourse = {
        "id":"4",
        "name":"Wednesday Morning",
        "schedule":"10:00-13:30",
        "dates":["18-10-2017",
                    "25-10-2017",
                    "01-11-2017",
                    "08-11-2017",
                    "15-11-2017",
                    "22-11-2017",
                    "29-11-2017",
                    "06-12-2017",
                    "13-12-2017",
                    "20-12-2017",
                    "27-12-2017"],
        "students":["7","8","9","10","11"],
        "alternativeStudents":[]
        };
    var course = new Course(fixedCourse);
    console.log(JSON.stringify(course));
});