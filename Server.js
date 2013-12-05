var http = require('http');
var io = require('socket.io');
var fs = require('fs');
var twitterAPI = require('node-twitter-api');

var server = http.createServer(function(req, res) {
  fs.readFile(__dirname + "/wall.html", function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});
server.listen(8090);

var  twitter = new twitterAPI({
    consumerKey: 's7Olfe8DUZlSS5dOs9iLA',
    consumerSecret: '0NpbgawetQSld2UKau3pHIWUPnzt3NID2c2HeWKL48',
    callback: 'http://yoururl.tld/something'
});

var accessToken = "478651459-7BNXdRnGq2buiMLLjxkF11iqRdVDqZ5ANhgw3HRM";
var accessTokenSecret = "tXC81Y316cH1uTa4wkTBEhxWXAbYxcKHowuFs7CzLD6Hx";

twitter.statuses("user_timeline", {
		screen_name: "nuitdelinfo2013",
		count: 20
	},
	accessToken,
	accessTokenSecret,
	function(error, data, response) {
	console.log("iiiiiiiiiiiii");
		if (error) {
			console.log(error);
		} else {
			console.log(data);
		}
	}
);

twitter.statuses("update", {
        status: "Hello world!"
    },
    accessToken,
    accessTokenSecret,
    function(error, data, response) {
        if (error) {
            // something went wrong
        } else {
            // data contains the data sent by twitter
        }
    }
);

// socket.io 
io.listen(server).on('connection', function(client){
	client.emit("tweet", {"test" : "test"});
});