var http = require('http');
var io = require('socket.io');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Hello Http');
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