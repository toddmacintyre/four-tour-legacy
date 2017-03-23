angular.module("mapApp", [
  "mapApp.map",
  "mapApp.home",
  "ngRoute",
  "four-tour-svcs"
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

.run(function($rootScope,mapping) {
    $rootScope.user = '';
    $rootScope.origin;
    $rootScope.coords = {};
    $rootScope.located = false;
    $rootScope.chosenCategoryId = '';
    $rootScope.useGeo = false;
    mapping.userLocator();
})