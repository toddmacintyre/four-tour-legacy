angular.module("mapApp", [
  "mapApp.map",
  "mapApp.home",
  "ngRoute"
])

// recommend changing to ui-router bc of errors loading
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: "./home/home.html",
    controller: "homeCtrl"
  })
  .when('/map', {
    templateUrl: "./map/map.html",
    controller: "mapCtrl"
  })
})

.run(function($rootScope) {
    $rootScope.origin = {};
    $rootScope.destination = {};
})