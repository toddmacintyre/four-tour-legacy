angular.module("mapApp", [
  "mapApp.map",
  "mapApp.home",
  "ngRoute"
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
  })





  // Tests for global watcher

  // .controller('mapAppCtrl', function($rootScope, $location, $locationChangeStart, $on) {
  //   $scope.$watch(function(){
  //       return $location.path();
  //   }, function(value){
  //       // $rootScope.mapRender = !$rootScope.mapRender;
  //       // console.log($rootScope.mapRender);
  //       console.log(value);
  //   });

    // $rootScope.$on("$locationChangeStart", function() {
    //   // This will run on every location change, before the
    //   // whole route is processed. Good for things like Identity
    //   // management.
    //   $rootScope.mapRender = !$rootScope.mapRender;
    //   console.log('working');
    // });
  // });


//   .service('sharedMapRender', function () {
//     var mapRender = false;
//     return {
//       get: function () {
//         return mapRender;
//       },
//       set: function (boolean) {
//         mapRender = boolean;
//       }
//     };
//   })
//   .controller('mapAppCtrl', function($rootScope, $scope, $window, $http, sharedMapRender) {
// // transfer sharedMapRender into a scope variable in the app controller