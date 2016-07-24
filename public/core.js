// public/core.js

var diary = angular.module('diary', ['ngAnimate','ui.bootstrap'])
    .controller('mainController',['$scope', '$http','$uibModal',
            function($scope,$http,$uibModal){
                $scope.formData = {};
                $scope.courses = [];
                $scope.sortType     = 'id'; // set the default sort type
                $scope.sortIt  = false;  // set the default sort order
                $scope.searchTerm   = '';     // set the default search/filter term
                $scope.items = ['item1', 'item2', 'item3'];

                $scope.getCourses = function(){
                    // This function return the `$thhp` promise that resolves with the data returned from the server
                    return $http.get('/api/courses').then(
                        function(response) {
                            // You can also manipulate the data before resolving it here
                            return response.data;
                        },
                        function(data) {
                            console.log('Error: ' + data);
                        }
                    );
                }



                // delete a course after checking it
                $scope.deleteCourse = function(mongoId) {
                console.log("id vale: " + mongoId)
                    $http.delete('/api/courses/' + mongoId)
                        .success(function(data) {
                            $scope.courses = data;
                            console.log(data);
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                };

                  $scope.open = function (course) {
                    if(course!==undefined)
                        course.date = stringToDate(course.date);


                    var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
                      templateUrl: 'myModalContent.html',
                      controller: 'ModalInstanceCtrl',
                      resolve: {
                        formData: course
                      }
                    });

                    modalInstance.result.then(function () {

                    }, function () {
                      console.log('Modal dismissed at: ' + new Date());
                    });
                  };

                  $scope.toggleAnimation = function () {
                    $scope.animationsEnabled = !$scope.animationsEnabled;
                  };

                $scope.getCourses().then(
                    function(data) {
                        $scope.courses = data;
                    }
                )

                $scope.getMoreData = function () {
                    $scope.data = $scope.courses.slice(0, $scope.data.length + 20);
                }


            }
            ]
        );

        diary.controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, formData) {

                $scope.formData = formData;
                $scope.courses = [];

                  $scope.updateCourse = function (formData) {
                      formData.date = dateToString(formData.date);
                      console.log("date converted")
                      $http.put('/api/courses/', formData)
                          .success(function(data) {
                              console.log("Successss after inserting in db")
                              $scope.courses = data;
                          })
                          .error(function(data) {
                              console.log('Error: ' + data);
                          });
                      $uibModalInstance.close($scope.formData);
                  };

                  // when submitting the add form, send the text to the node API
                  $scope.createCourse = function(formData) {

                      $http.post('/api/courses', formData)
                          .success(function(data) {
                              $scope.formData = {}; // clear the form so our user is ready to enter another
                              console.log($scope.courses.length)
                              $scope.courses = data;
                              console.log($scope.courses.length)
                              console.log("course inserita a priori " + formData.id);
                          })
                          .error(function(data) {
                              console.log('Error: ' + data);
                          });
                      console.log($scope.courses.length)
                      $uibModalInstance.close(formData);
                  };

                  $scope.closeModal = function () {
                    console.log("ferma la modal!!!!!!!!!!");
                    //modalInstance.close();
                    $uibModalInstance.dismiss('cancel');
                    //$uibModalInstance.dismiss('cancel');
                  };

              });

function dateToString(dateObj) {
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getUTCFullYear();

    return day + "/" + month + "/" + year;
}
function stringToDate(dateStr) {
  var parts = dateStr.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

/*
diary.factory('Courses', function(){
  return [];
});
*/