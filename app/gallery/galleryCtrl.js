coursomaticApp.controller("GalleryCtrl", function ($scope, $http, $location,Course, Courses, activeUser, allSessions) {
    if (!Courses.isLoaded) {
        $http.get("data/courses.json").then(function (response) {
            var coursesIndex = Object.keys(response.data);
            for (var i = 0; i < coursesIndex.length; i++) {
                Courses.add(new Course(response.data[coursesIndex[i]],coursesIndex[i]));
                }
        $scope.courses = Courses.getAll();
        $scope.allSessionsArr = allSessions.getAllSessionsArr();
        $scope.loggedUser = activeUser.get();
        Courses.isLoaded = true;
        })
       } else {
            $scope.courses = Courses.getAll();           
            $scope.allSessionsArr = allSessions.getAllSessionsArr();       
            $scope.loggedUser = activeUser.get();
       }

       $(document).ready(function(){
    // clicking button with class "category-button"
        $(".category-click").click(function(){
        // get the data-filter value of the button
        var filterValue = $(this).attr('data-filter');
        
        // show all items
        if(filterValue == "all")
        {
            $(".all").show("slow");
        }
        else
        {   
            // hide all items
            $(".all").not('.'+filterValue).hide("slow");
            // and then, show only items with selected data-filter value
            $(".all").filter('.'+filterValue).show("slow");
        }
    });

});
});

