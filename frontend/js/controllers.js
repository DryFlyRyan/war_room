angular.module('war_room')
  .controller('dashboardController', dashboardController)
  .controller('serverController', serverController);

dashboardController.$inject = ['$scope', 'serverInfoService']

function dashboardController($scope, serverInfoService) {
  console.log("Hit home controller");
  serverInfoService.on(function(data) {
    // console.log(data.body);
    $scope.servers = data;
    // console.log($scope.servers);
    $scope.$apply()
  })
  $scope.caution = 0.05;
  $scope.warning = 0.5;


}

serverController.$inject = ['$scope', '$stateParams', 'serverInfoService']

function serverController($scope, $stateParams, serverInfoService) {
  serverInfoService.on(function(data){
    console.log($stateParams);
    console.log(data);
    data.forEach(function(server){
      if (server.id === parseInt($stateParams.id)) {
        $scope.server = server
        console.log($scope.server);
        $scope.$apply()
      }
    })
  })
}
