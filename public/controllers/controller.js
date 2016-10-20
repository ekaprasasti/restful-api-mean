/*
	Step 19 - Create controller in app
	Controller communicate with our view
	Model contain our data
*/
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello world from controller");

	// step 35 - Automaticly refresh the contact list when the add contact button is click
	var refresh = function() {
		/*
			Step 23 - Create $http.get for get request our data from the server
			/contact list is the route contact from server
		*/
		$http.get('/contactlist').success(function(response) {
			console.log("I got the data I requested");
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	// call the function
	refresh();

	// $scope = The glue for controller and view
	$scope.addContact =  function() {
		// step 31 - Define test to add function
		console.log($scope.contact);

		// step 32 - Sent input data to the server
		$http.post('/contactlist', $scope.contact).success(function(response) {
			// step 34 - Test to makesure controller received new data from database
			console.log(response);
			// call the function
			refresh();
		});
	};

	// step 36 - Define and test the remove function
	$scope.remove = function(id) {
		console.log(id);
		// step 37 - Sent http delete request to the server
		$http.delete('/contactlist/'+ id).success(function(response) {
			refresh();
		});
	};

	// step 40 - Define the edit function
	// function to insert data to the form input
	$scope.edit = function(id) {
		console.log(id);
		$http.get('/contactlist/' + id).success(function(response) {
			// data from server
			// send data to the input box contact
			$scope.contact = response;
		});
	};

	// step 41 - Define the update function in our controller
	$scope.update = function() {
		console.log($scope.contact._id);

		// step 42 - Use a put request to send the data to server to be updated
		// wich id, and send $scope.contact to the server
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
			refresh();
		});
	};

	// step 43 - Fix a glitch by adding a clear button
	$scope.deselect = function() {
		$scope.contact = "";
	}
}]);