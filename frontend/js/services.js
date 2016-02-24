angular.module('war_room')
  .factory('serverInfoService', serverInfoService);

serverInfoService.$inject = ['$stateParams']

function serverInfoService($stateParams) {
  var socket=io()
  var callbacks = []
  console.log('state params = ',$stateParams);
  socket.on('serverInfo', function(data){
    console.log(data);
    callbacks.forEach(function(callback){
      callback(data.body)
    })
  })
  return {
    on: function(callback) {
      callbacks.push(callback);
    },
  }
}
