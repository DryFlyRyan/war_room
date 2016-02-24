var app = angular.module("war_room", ['ui.router'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  console.log("Angular's working");

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('dashboard', {
    templateUrl: 'partials/dashboard.html',
    controller: 'dashboardController',
    url:'/'
  }).state('serverInfo', {
    templateUrl: 'partials/server.html',
    controller: 'serverController',
    url:'/server/:id'
  })
  .state('settings', {
    templateUrl: 'partials/settings.html',
    controller: 'settingsController',
    url:'/settings'
  })


  $locationProvider.html5Mode(true);
});
