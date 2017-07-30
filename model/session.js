coursomaticApp.factory("Session", function () {
  function Session(plainObject,index) {     
            this.id = index;
            this.date = plainObject.date;
            this.added = plainObject.added;
            this.removed = plainObject.removed;
    };
    return Session;
});