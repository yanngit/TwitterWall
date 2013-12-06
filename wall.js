var wall = angular.module("wall", []);

wall.controller('wallCtrl', function($scope) {
	$scope.tweets = [];
	var socket = io.connect();

	socket.on('tweets', function(data){
		console.log(data);
		$scope.tweets = data;
	});
});