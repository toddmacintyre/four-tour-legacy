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
    $rootScope.located = false;
    $rootScope.useGeo = false;
    $rootScope.radius = 1000;
    $rootScope.user = '';
    $rootScope.origin;
    $rootScope.coords = {};
    $rootScope.chosenCategoryId = '';
    $rootScope.limit = 5;
    $rootScope.sortBy = "rating";
    mapping.userLocator();
})

