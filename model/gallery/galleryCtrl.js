coursomaticApp.controller("GalleryCtrl", function ($scope, $uibModalInstance, $http, $location, activeUser, User) {

    $scope.toTimeline = function() {
        $location.path("/timeline");
    }
});
