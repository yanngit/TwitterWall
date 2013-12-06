var http = require('http');
var io = require('socket.io');
var fs = require('fs');
var twitterAPI = require('twitter-api');
var cronJob = require('cron').CronJob;

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

var tweets = [];
var clients = [];

var t = twitterAPI.createClient();
t.setAuth(
	's7Olfe8DUZlSS5dOs9iLA',
	'0NpbgawetQSld2UKau3pHIWUPnzt3NID2c2HeWKL48',
    '478651459-7BNXdRnGq2buiMLLjxkF11iqRdVDqZ5ANhgw3HRM',
    'tXC81Y316cH1uTa4wkTBEhxWXAbYxcKHowuFs7CzLD6Hx'
);

var job = new cronJob('*/10 * * * * *', function(){
	console.log("GET TWEETS");
	var params = {q: "#nuitdelinfo2013", count: 2};
	if(tweets.length > 0) {
		params["since_id"] = tweets[0].id;
	}

	t.get("search/tweets", params, function(page, error, status) {
		var tweetsReceived = page.statuses;
		if(tweetsReceived.length > 0) {
			var newTweets = [];
			var nbNew = tweetsReceived.length -1;
			for(var i = nbNew; i >= 0; i--) {
				var tweet = tweetsReceived[i];
				if(tweets.length == 0 || tweet.id !== tweets[0].id) {
					newTweets.unshift({id: tweet.id, text: tweet.text, user: tweet.user.screen_name});
				}
			}
			
			clients.forEach(function(client) {
				client.emit("tweets", newTweets);
			});
			tweets = newTweets.concat(tweets);
		}
	});
  }, function () {
  },
  true
);

// socket.io 
io.listen(server).on('connection', function(client){
	clients.push(client);
	client.emit("tweets", tweets);
});