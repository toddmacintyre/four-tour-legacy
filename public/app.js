angular.module("mapApp", [
  "mapApp.map",
  "mapApp.home",
  "ngRoute",
  "mapApp.slider",
  "four-tour-svcs"
])

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

