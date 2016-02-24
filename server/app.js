require('dotenv').load();

var express = require('express');
var socket = require('socket.io');
var http = require('http');
var unirest = require('unirest');
var db = require('monk')(process.env.DB_CONNECTION)
var warroom = require('./warroom-client')

var app = express();
var server = http.Server(app);
var io = socket(server);

//Functions
db.get('servers').drop();

var serverArray = {}
function findAverage(targetArray) {
  targetArray.forEach(function(server, index) {
    if (serverArray.hasOwnProperty(server.id)) {
      serverArray[server.id].total += server.responseTime;
      serverArray[server.id].count++;
    } else {
      serverArray[server.id] = {
        total: server.responseTime,
        count: 1,
        average: function() {
          return this.total / this.count;
        }
      }
    }
  })
  return serverArray;
}

// warroom(function(error, data) {
//   if (data) {
//     newServerArray = [];
//     data.data.forEach(function(server) {
//       newServerArray.push(server);
//     })
//     console.log(newServerArray);
//     formatDB(newServerArray);
//   }
// });


// Sockets

io.on('connection', function(socket){
  warroom(function(err, data){
    // console.log(data.data);
    var average = findAverage(data.data);
    // console.log(average);
    db.get('servers').insert(data.data)
    for (var i = 0; i < data.data.length; i++) {
      for(key in average) {
        if(parseInt(data.data[i].id) == parseInt(key)){
          data.data[i].average = average[key].average();
        }
      }
    }
    console.log(data.data);
    socket.emit('serverInfo',{
      body: data.data
    })
  })
})

// io.on('connection', function(socket) {
//   setInterval(function(){
//     db.get('servers').find()
//     .then(function(results){
//       console.log(results);
//       // var average = findAverage(serverList);
//       console.log("making it here?")
//       console.log('average: ',average)
//       socket.emit('serverInfo', {
//         body: newServerArray,
//         average: average
//       })
//     })
//   }, 1000)
// })

app.use(express.static('./frontend'));

var port = process.env.PORT || 3000;

server.listen(port, function(){
  console.log("Server listening on ", port);
})

module.exports = app;
