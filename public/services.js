angular.module('four-tour-svcs',[])

  .factory('mapping', function($rootScope) {

    var user = {};

    var userLocation = function() {
      console.log($rootScope.located)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          user.lat = position.coords.latitude;
          user.lng = position.coords.longitude;
          $rootScope.located = true;
          console.log($rootScope.located)
        });
      } else {
        console.log("geolocation factory error");
      }
    }

    return {
      user: user,
      userLocation: userLocation,
    }

  });