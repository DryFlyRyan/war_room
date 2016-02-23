angular.module('war_room')
  .controller('dashboardController', dashboardController)
  .controller('serverController', serverController);

dashboardController.$inject = ['$scope', 'serverInfoService']

function dashboardController($scope, serverInfoService) {
  console.log("Hit home controller");
  // $scope.servers = [
  //   {
  //     id: 1,
  //     name: "Alpha",
  //     responseTime: 1
  //   },
  //   {
  //     id: 2,
  //     name: "Beta",
  //     responseTime: 1.5
  //   },
  //   {
  //     id: 3,
  //     name: "Cowboy",
  //     responseTime: 2
  //   },
  // ]
  serverInfoService.on(function(data) {
    // console.log(data.body);
    $scope.servers = data;
    console.log($scope.servers);
    $scope.$apply()
  })
}

function serverController() {

}
