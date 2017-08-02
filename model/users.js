//service constructor
coursomaticApp.factory("User", function () {
    function User(plainObject) {
        this.id = plainObject.id;
        this.firstName = plainObject.firstName;
        this.lastName = plainObject.lastName;
        this.phone = plainObject.phone;
        this.city = plainObject.city;
        this.email = plainObject.email;
        this.password = plainObject.password;
        this.type = plainObject.type;
        this.courseId = plainObject.courseId;
        this.clipartUrl = plainObject.clipartUrl;
    };
    return User;
});

// Service that manges users
coursomaticApp.factory("activeUser", function () {
    var user = null;

    var isLoggedIn = function () {
        return user ? true : false;
    };

    var isTeacher = function (){
        return (user.type === "teacher");
    }

    var login = function (loggedInUser) {
        user = loggedInUser;
        if (typeof(Storage) !== "undefined") {
            user = loggedInUser;
            localStorage.loggedInUser = loggedInUser;
            user = loggedInUser;
        } else {
            user = loggedInUser;
        }
    };

    var logout = function () {
        user = null;
    };

    var get = function () {
        return user;
    };
// todo
    var getUserCourses = function (){

    }

    return {
        isLoggedIn: isLoggedIn,
        isTeacher: isTeacher,
        login: login,
        logout: logout,
        get: get,
        getUserCourses: getUserCourses
    };
});

coursomaticApp.factory("Users", function () {
    var usersArr = [];

    var addUser = function (user){
        usersArr.push(user);
    };

    var updateUser = function (index, user) {
        usersArr[index] = user;
    }

    var removeUser = function (index) {
        usersArr.splice(index,1);
    }
    var getAllUsers = function() {
        return usersArr;
    }

    var get = function(index) {
        return usersArr[index];
    }


    return {
        addUser: addUser,
        updateUser: updateUser,
        removeUser: removeUser,
        getAllUsers: getAllUsers,
        get: get,
     }
});

