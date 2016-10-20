// Step 8 - Require express module
var express 	= require('express');
var app 		= express();

// Step 28 - Require MongoJS into server.js file
var mongojs 	= require('mongojs');
// wich mongodb dbs and collection
var db 			= mongojs('contactlist', ['contactlist']);

var bodyParser 	= require('body-parser');

// Step 10 - Setup HTML template
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// get contact list data
app.get('/contactlist', function(req, res) {
	// tell the server to received get request for our contactlist to route
	console.log("I received a Get Request");

	// step 28 - Get our data from mongoDB with a get request
	// find data from database and get back data to the controller
	db.contactlist.find(function(err, docs) {
		console.log(docs);

		// response for sending get request and sending back to json format to a controller
		res.json(docs);
	});
});

// step 32 - received data input from controller
app.post('/contactlist', function(req, res) {
	// req.body need install body-parser module
	console.log(req.body);

	// step 33 - Insert the input data into the mongoDB database
	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

// step 37 - Sent http delete request to the server
app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);

	// step 38 - Delete contact from mongoDB database
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		// send back data to the controller
		res.json(doc);
	});
});

// step 40 - Define the edit function
app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		// send back data to the controller
		res.json(doc);
	});
});

// step 42 - Use a put request to send the data to server to be updated
app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true
	}, function(err, doc) {
		res.json(doc);
	});
});

// step 9 - Make sure server running correctly
// run server in terminal by using command: node server.js
app.listen(3000);
console.log("Server running on port 3000");