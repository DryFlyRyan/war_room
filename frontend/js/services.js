angular.module('war_room')
  .factory('serverInfoService', serverInfoService)
  .factory('thresholdService', thresholdService)

serverInfoService.$inject = ['$stateParams']

function serverInfoService($stateParams) {
  var socket=io()
  var callbacks = []
  console.log('state params = ',$stateParams);
  socket.on('serverInfo', function(data){
    // console.log(data);
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

function thresholdService($http) {
  var thresholds = [];
  $http.get('./settings')
  .then(function(data){
    // console.log(data);
    thresholds.push(data.data[0]);
    // console.log(thresholds[0]);
  })
  return {
    on: function(thresholds) {
      return thresholds;
    }
  }
}
