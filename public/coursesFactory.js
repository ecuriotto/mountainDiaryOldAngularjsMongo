

diary.factory('courses',['$http', function($http){
  var courses = {'data':[]};

  courses.create = function(formData) {

           console.log('course.date + di tipo: ' + typeof formData.date);
           console.log(courses);

           formData.date = moment(formData.date).format("DD/MM/YYYY");
           console.log('momentaggio... formData.date + di tipo: ' + typeof formData.date);
           return $http.post('/api/courses', formData)
               .then(function(response) {
                   courses.data = response.data;
                   return response.data;
               },
               function(data) {
                   console.log('Error Insert: ' + data);
               });

  };

  courses.update = function (formData) {
         formData.date = moment(formData.date).format("DD/MM/YYYY");
         console.log("date converted")
         return $http.put('/api/courses/', formData)
             .then (function(response) {
                 console.log("Success after updating the db");
                 courses.data = response.data;
                 return response.data;
             },
             function(data) {
                 console.log('Error: ' + data);
             });

  };

  courses.delete = function(mongoId) {
      console.log("id vale: " + mongoId)
      return $http.delete('/api/courses/' + mongoId)
          .then(function(response) {
              console.log("data length" + response.data.length);
              console.log("Success after deleting the db")

              return response.data;
          },
          function(data) {
              console.log('Error: ' + data);
          });
  };

  courses.getAll = function(){
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

  return courses;
}]);
