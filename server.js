// set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb

    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    mongoose.connect('mongodb://localhost/montagna');     // connect to mongoDB database locally

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // define model =================
    // Todo -> Diary
    var Schema = mongoose.Schema;
    var Diary = mongoose.model('Diary', new Schema(
        {
            id : Number,
            date : String,
            courseType : String,
            place : String,
            partners : String,
            description : String,
            descriptionDetail : String,
            descriptionUrl : String,
            photoUrl : String
        }
        ),
        'diary'
    );



    // routes ======================================================================

        // api ---------------------------------------------------------------------
        // get all todos
        // todos -> courses
        app.get('/api/courses', function(req, res) {
            console.log('get All: ');
            // use mongoose to get all todos in the database
            Diary.find(function(err, diary) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)

                res.json(diary); // return all todos in JSON format
            });

        });

        app.get('/api/courses/:mongoId', function(req, res) {
            // use mongoose to get all todos in the database
            console.log('mongoID: '+ req.params.mongoId);
            Diary.find({'_id' : req.params.mongoId },function(err, diary) {
                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)
                res.json(diary); // return all todos in JSON format
            });
        });

        // create todo and send back all todos after creation
        app.post('/api/courses', function(req, res) {
            // create a todo, information comes from AJAX request from Angular
            var max=0;
            //Get the max id
            Diary.findOne({})
				.sort({id: -1})
                //.sort('-id')
                .exec(function(err, doc)
                {
					if(err || isNaN(doc.id)){
						console.log("error: " + err + " doc " + doc)
					}
					else{						
						max = doc.id;					
						Diary.create({
							id : max+1,
							date : req.body.date,
							courseType : req.body.courseType,
							place : req.body.place,
							partners : req.body.partners,
							description : req.body.description,
							descriptionDetail : req.body.descriptionDetail,
							descriptionUrl : req.body.descriptionUrl,
							photoUrl : req.body.photoUrl,
							done : false
						}, function(err, course) {
							 if (err){
								 res.send(err);
								 console.log("error: " + err);
							 }
							 else{
								 Diary.find(function(err, courses) {
									 if (err)
										 res.send(err)

									 res.json(courses);
								 });
							 }
							 
							  
							 
						 });
					}	 
                }
            );

         });



            app.put('/api/courses/', function(req, res) {
                // update course, information comes from AJAX request from Angular
                Diary.findByIdAndUpdate(req.body._id,req.body, {
                }, function(err, todo) {
                    if (err)
                        res.send(err);
                    console.log("In findByIdAndUpdate... " + req.body)
                    // get and return all the todos after you create another
                    Diary.find(function(err, courses) {
                        if (err)
                            res.send(err)
                        res.json(courses);
                    });
                });

            });

        // delete a todo
        app.delete('/api/courses/:mongoId', function(req, res) {
            Diary.remove({
                _id : req.params.mongoId
            }, function(err, course) {
                if (err){
                    console.log("Errore!!! " + err);
                    res.send(err);
                }
                else{
                    // get and return all the todos after you create another
                    Diary.find(function(err, courses) {
                        if (err)
                            res.send(err)
                        console.log("courses.length " + courses.length)
                        res.json(courses);
                    });
                }
            });
        });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
	
	var today  = new Date();
    // listen (start app with node server.js) ======================================
    app.listen(8089);
    console.log(today.toLocaleString("en-US") + " - App listening on port 8089");