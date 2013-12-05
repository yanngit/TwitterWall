var http = require('http');
var io = require('socket.io');
var fs = require('fs');

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

// socket.io 
var socket = io.listen(server); 
socket.on('connection', function(client){ 
    // new client is here! 
    client.on('message', function(){ 
        console.log('message arrive');
        client.send('some message');
    });

    client.on('disconnect', function(){
        console.log('connection closed');
    });

});