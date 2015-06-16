angular.module('jobfinder.upload', [])

.controller('UploadController', function ($scope, $window, $location, $http) {
  $scope.uploadFile = function() {
    var file = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onloadend = function(e) {
      var data = e.target.result;
      return $http({
        method: 'POST',
        url: '/upload',
        data: {
          userId: $window.localStorage.userId,
          data: csvJSON(data)
        }
      })
      .then(function(resp) {
        return resp.data;
      });
    };

    r.readAsBinaryString(file);
  };

function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");

  var first_name_col = 1;
  var last_name_col = 3;
  var email_col = 5;
  var company_col = 29;
  var job_title_col = 31;

  for(var i=1;i<lines.length-2;i++){
    var obj = {};
    var currentline=lines[i].split(",");
    
    obj.firstName = currentline[first_name_col];
    obj.lastName = currentline[last_name_col];
    obj.email = currentline[email_col];
    obj.company = currentline[company_col];
    obj.jobTitle = currentline[job_title_col];

    result.push(obj);
  }
  return result;
}


});
// .directive('fileModel', ['$parse', function ($parse) {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attrs) {
//             var model = $parse(attrs.fileModel);
//             var modelSetter = model.assign;
            
//             element.bind('change', function(){
//                 scope.$apply(function(){
//                     modelSetter(scope, element[0].files[0]);
//                 });
//             });
//         }
//     };
// }])
// .service('fileUpload', ['$http', function ($http) {
//     this.uploadFileToUrl = function(file, uploadUrl){
//         var fd = new FormData();
//         fd.append('file', file);
//         $http.post(uploadUrl, fd, {
//             transformRequest: angular.identity,
//             headers: {'Content-Type': undefined}
//         })
//         .success(function(){
//         })
//         .error(function(){
//         });
//     }
// }])

// .controller('UploadController', ['$scope', 'fileUpload', function($scope, fileUpload){
    
//     $scope.uploadFile = function(){
//       console.log("A");
//         var file = $scope.myFile;
//         console.log('file is ' + JSON.stringify(file));
//         var uploadUrl = "/upload";
//         fileUpload.uploadFileToUrl(file, uploadUrl);
//     };
    
// }])