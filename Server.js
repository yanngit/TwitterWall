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
    consumerKey: 'your consumer Key',
    consumerSecret: 'your consumer secret',
    callback: 'http://yoururl.tld/something'
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        //store token and tokenSecret somewhere, you'll need them later; redirect user
    }
});

// socket.io 
io.listen(server).on('connection', function(client){
	client.emit("tweet", {"test" : "test"});
});