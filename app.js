var express = require('express');
var socket = require('socket.io');
var http = require('http');
var unirest = require('unirest');

var app = express();
var server = http.Server(app);
var io = socket(server);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static('./frontend'));

var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log("Server listening on ", port);
})


module.exports = app;
