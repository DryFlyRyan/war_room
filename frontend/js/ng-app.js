var app = angular.module("war_room", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
  console.log("Angular's working");

  $urlRouterProvider.otherwise('/dashboard');

  $stateProvider.state('dashboard', {
    templateUrl: 'partials/dashboard.html',
    controller: 'dashboardController',
    url:'/dashboard'
  }).state('serverInfo', {
    templateUrl: 'partials/server.html',
    controller: 'serverController',
    url:'/dashboard/server/:id'
  })
  .state('testPage', {
    templateUrl: 'partials/test.html',
    url:'/dashboard/test'
  })
});
