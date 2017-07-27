//service constructor
coursoramaApp.factory("Session", function () {
    function Session(plainObject) {
        this.courseId = plainObject.courseId;
        this.date = plainObject.date;
        this.studentList = plainObject.studentList;
    };
    return Session;
});
