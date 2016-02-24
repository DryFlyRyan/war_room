angular.module('war_room')
  .controller('dashboardController', dashboardController)
  .controller('serverController', serverController)
  .controller('settingsController', settingsController)

dashboardController.$inject = ['$scope', 'serverInfoService']

function dashboardController($scope, serverInfoService) {
  console.log("Hit home controller");
  serverInfoService.on(function(data) {
    // console.log(data.body);
    $scope.servers = data;
    // console.log($scope.servers);
    $scope.$apply()
  })
  $scope.warning = 0.05;
  $scope.critical = 0.5;


}

serverController.$inject = ['$scope', '$stateParams', 'serverInfoService', 'thresholdService']

function serverController($scope, $stateParams, serverInfoService, thresholdService) {
  serverInfoService.on(function(data){
    // console.log($stateParams);
    // console.log(data);
    data.forEach(function(server){
      if (server.id === parseInt($stateParams.id)) {
        $scope.server = server
        // console.log($scope.server);
        $scope.$apply()
      }
    })
  })
  // thresholdService.on(function(data){
  //   console.log(data);
  // })

  $scope.warning = 0.05;
  $scope.critical = 0.5;
}

settingsController.$inject = ['$scope', 'thresholdService']

function settingsController($scope, thresholdService) {
  // thresholdService.on(function(data){
  //   console.log('threshold data: ', data);
  //   $scope.warning = data[warning]/1000;
  //   $scope.critical = data[critical]/1000;
  // })
}
