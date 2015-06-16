angular.module('jobfinder.upload', [])

.controller('UploadController', function ($scope, $window, $location, Upload) {
 $scope.uploadContacts = function() {
  Upload.uploadData($scope.csvData)
 }
});