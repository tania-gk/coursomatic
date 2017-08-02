coursomaticApp.factory("Session", function (Users,User) {
  function Session(plainObject,index, courseName, students) { 
            this.name = courseName; 
            this.students = getStudents(students);
            this.id = index;
            this.date = plainObject.date;
            this.added = plainObject.added;
            this.removed = plainObject.removed;
    };

    getStudents = function (students) {
      var studentsArr = "";
      var usersArr = Users.getAllUsers();
      for (var i=0 ; i< students.length; i++){
        for (var j=0; j< usersArr.length ; j++) {
          if (students[i] === usersArr[j].id) {
            if (i>0 && i<students.length){
              studentsArr += ", ";
            }
            studentsArr += usersArr[j].firstName + " "+ usersArr[j].lastName;
          }
        }
      }
      return studentsArr;
    }
    return Session;
});


coursomaticApp.factory("allSessions",function(Course, Courses, Session){
    var getAllSessionsArr = function (){
      var coursesArr = Courses.getAll();
      var j=0;
      var k=0;

      var allSessions = [];
      for (var i=0; i< coursesArr.length; i++ ){
        for (var j=0; j< coursesArr[i].sessionsData.length ; j++){
          allSessions[k++] = coursesArr[i].sessionsData[j];
        }
      }
      return allSessions;
  }

  

  return {
    getAllSessionsArr : getAllSessionsArr,
  }
});