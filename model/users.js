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
    };
    return User;
});

// Service that manges users
coursomaticApp.factory("activeUser", function () {
    var user = null;

    var isLoggedIn = function () {
        return user ? true : false;
    };

    var login = function (loggedInUser) {
        user = loggedInUser;
    };

    var logout = function () {
        user = null;
    };

    var get = function () {
        return user;
    };

    return {
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        get: get
    };
});