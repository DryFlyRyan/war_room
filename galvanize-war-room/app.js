var express = require('express');
var http = require('http');

require('dotenv').load();

var app = express();
var server = http.Server(app);
var port = process.env.PORT || '3000';
console.log(port);

app.use(express.static('./app'))

server.listen(port, function(){
  console.log("Listening on ", port);
})
