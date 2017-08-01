coursomaticApp.factory("Session", function () {
  function Session(plainObject,index) {     
            this.id = index;
            this.date = plainObject.date;
            this.added = plainObject.added;
            this.removed = plainObject.removed;
    };
    return Session;
});

coursomaticApp.factory("AllSessions",function(Courses){
  var getAllSessionsArr = function (allCourses){
    var coursesArr = Courses.getAll();
    var j=0;
    var k=0;

    var allSessions = [];
    for (var i=0; i< coursesArr.length; i++ ){
      for (var j=0; j< coursesArr[i].sessionsData.length ; j++){
        allSessions[k+1] = coursesArr[i].sessionsData[j];
      }
    }
    return allSessions;
  }

  return {
    getAllSessionsArr:getAllSessionsArr
  }
});