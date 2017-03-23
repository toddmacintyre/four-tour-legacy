angular.module("mapApp", [
  "mapApp.map",
  "mapApp.home",
  "ngRoute",
  "mapApp.slider"
])

  // recommend changing to ui-router bc of errors loading
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: "./home/home.html",
        controller: "homeCtrl"
      })
      .when('/map', {
        templateUrl: "./map/map.html",
        controller: "mapCtrl"
      })
  });