//service constructor
coursomaticApp.factory("User", function() {
    function User(plainObject) {
        this.firstName = plainObject.firstName;
        this.lastName = plainObject.lastName;
        this.phone = plainObject.phone;
        this.city = plainObject.city;
        this.email = plainObject.email;
        this.password = plainObject.password;
        this.type = "student";
        this.courseId = plainObject.courseId;
        /*        this.clipartUrl = plainObject.clipartUrl;*/
    };
    return User;
});

// Service that manges users
coursomaticApp.factory("activeUser", function(User) {
    var user = new User({});

    var isLoggedIn = function() {
        return (localStorage.firstName || user) ? true : false;
    };

    var isTeacher = function() {
        if (localStorage.firstName && user.type === "teacher") {
            return true;
        } else {
            return false;
        }
    }

    var login = function(loggedInUser) {
        user = loggedInUser;
        if (typeof(Storage) !== "undefined") {
            localStorage.firstName = loggedInUser.firstName;
            localStorage.lastName = loggedInUser.lastName;
            user = loggedInUser;
        } else {
            user = loggedInUser;
        }
    };

    var logout = function() {
        user = null;
        localStorage.firstName = null;
        localStorage.lastName = null;
    };

    var get = function() {
        return user;
    };
    // todo
    var getUserCourses = function() {

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

coursomaticApp.factory("Users", function($http, User) {
    var usersArr = [];

    var addUser = function(user) {
        usersArr.push(user);
    };

    var updateUser = function(index, user) {
        usersArr[index] = user;
    }

    var removeUser = function(index) {
        usersArr.splice(index, 1);
    }
    var getAllUsers = function() {
        if (usersArr.length === 0) {
            $http.get("data/users.json").then(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    usersArr.push(new User(response.data[i]));
                }
            })
        }

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