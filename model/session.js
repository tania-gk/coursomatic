coursomaticApp.factory("Session", function (User) {
  function Session(plainObject,index, courseId) { 
            this.courseId = courseId;    
            this.id = index;
            this.date = plainObject.date;
            this.added = plainObject.added;
            this.removed = plainObject.removed;
    };
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

  /* check this code!! */
  var getCourseName = function (session){
    var coursesArr = Courses.getAll();
      for (var i=0; i<coursesArr.length; i++ ){
        if (session.courseId === coursesArr[i].courseId){
          return coursesArr[i].name;
        }
      }
  }

  return {
    getAllSessionsArr : getAllSessionsArr,
    getCourseName : getCourseName
  }
});