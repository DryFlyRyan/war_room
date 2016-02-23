require('dotenv').load();

var express = require('express');
var socket = require('socket.io');
var http = require('http');
var unirest = require('unirest');
// var db = require('monk')(process.env.DB_CONNECTION)
var warroom = require('./warroom-client')

var app = express();
var server = http.Server(app);
var io = socket(server);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
var servers = []

warroom(function(error, data) {
  if (data) {
    servers = [];
    console.log(data.data);
    data.data.forEach(function(server) {
      servers.push(server);
    })
    // console.log('warroom');
    // Promise.all(
    //   data.data.map(function(server) {
    //     return db.get('servers').insert(server);
    //   })
    // )
  }
});

// function mongoTest() {
//   return new Promise(function(resolve,reject){
//     db.get('servers')
//   })
//   .then(function(data){
//     resolve(data);
//   })
// }
// setInterval(function(){
//   console.log("intervalling");
//   mongoTest().then(function(data){
//     console.log(data);
//   })
// }, 500);

io.on('connection', function(socket) {
  setInterval(function(){
    console.log("connected");
    socket.emit('serverInfo', {
      body: servers
    })
    // db.get('servers').find().then(function(servers) {
    //   console.log(servers);
    //   socket.emit('servers', {
    //     body: servers
    //   })
    // })
  }, 1000)
})



var counter = 0;


app.use(express.static('./frontend'));

var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log("Server listening on ", port);
})


module.exports = app;
