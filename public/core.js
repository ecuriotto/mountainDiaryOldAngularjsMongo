// public/core.js

var diary = angular.module('diary', ['ngAnimate','ui.bootstrap'])
    .controller('mainController',['$scope', '$http','$uibModal','courses',
            function($scope,$http,$uibModal, courses){
                $scope.formData = {};
                //$scope.courses = [];
                $scope.sortType     = 'id'; // set the default sort type
                $scope.sortIt  = true;  // set the default sort order
                $scope.searchTerm   = '';     // set the default search/filter term
                /*
                $scope.getCourses = function(){
                    return courses.getAll();

                }
                */
                courses.getAll(function(courses){
                    return courses;
                });
                $scope.deleteCourse = function(mongoId) {
                    courses.delete(mongoId).then(
                        function(data){
                            $scope.courses = data;
                        }
                    );

                };

                // delete a course after checking it

                  //We call this when clicking on Aggiungi Attività
                  $scope.open = function (course) {
                    //spCourse.create(course);
                    if(course!==undefined){
                        course.date = moment(course.date,"DD/MM/YYYY").toDate();
                        console.log('course.date + di tipo: ' + typeof course.date);
                        course.insert = false;
                    }
                    else{
                        var course = {};
                        course.date = moment().toDate();
                        course.insert = true;
                    }
                    var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
                      templateUrl: 'courseModal.html',
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
                //$scope.getCourses().then(
                courses.getAll().then(
                    function(data) {
                        $scope.courses = data;
                    }
                )
            }
            ]
        );

        diary.controller('ModalInstanceCtrl', function ($scope, $http, $uibModalInstance, courses, formData) {

                $scope.formData = formData;
                //$scope.courses = [];

                  $scope.updateCourse = function (formData) {

                      courses.update(formData).then(
                          function(data){
                              $scope.courses = data;
                          }
                      );
                      //$uibModalInstance.close($scope.formData);
                      $uibModalInstance.close(formData);
                  };

                  // when submitting the add form, send the text to the node API
                  $scope.createCourse = function(formData) {
                      courses.create(formData).then(
                          function(data){
                              $scope.courses = data;
                              console.log(data.length);
                          }
                      );
                      $uibModalInstance.close(formData);
                  };

                  $scope.closeModal = function () {
                    console.log("ferma la modal!!!!!!!!!!");
                    //modalInstance.close();
                    $uibModalInstance.dismiss('cancel');
                    //$uibModalInstance.dismiss('cancel');
                  };

              });



