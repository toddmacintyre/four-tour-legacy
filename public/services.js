angular.module('four-tour-svcs',[])

  .factory('mapping', function($rootScope, $http) {

    var userLocator = function() {
      console.log($rootScope.located)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var coordString = 'latlng='+position.coords.latitude+','+position.coords.longitude;
          $rootScope.coords.lat = position.coords.latitude;
          $rootScope.coords.lng = position.coords.longitude;
          $http({
            method: 'post',
            url: '/api/geocode',
            data: {search: coordString}
          })
            .then(function(data) {
              $rootScope.user = data.data.results[0].formatted_address;
              $rootScope.origin = $rootScope.user;
              $rootScope.located = true;
              console.log($rootScope.located);
            })
            .catch(function(error) {
              console.log('FRONTEND REVERSE GEOCODE ERROR', error);
            })
        });
      } else {
        console.log("geolocation factory error");
      }
    }

    // var addressFormatter = function(address) {
    //   var formatted = address
    //                   .split("")
    //                   .map(char => char === ' ' ? "+" : char)
    //                   .join("");
    //   return "address="+formatted;
    // }

    // var latLngFinder = function(address, callback) {
    //   var addressString = addressFormatter(address);
    //   $http({
    //     method: 'post',
    //     url: 'api/geocode',
    //     data: {search: addressString}
    //   })
    //     .then(function(data) {
    //       $rootScope.coords.lat = data.data.results[0].geometry.location.lat;
    //       $rootScope.coords.lng = data.data.results[0].geometry.location.lat;
    //       console.log(address+' CONVERTED TO ', $rootScope.coords);
    //       callback(data);
    //     })
    //     .catch(function(error) {
    //       console.log('FRONTEND GEOCODE ERROR', error);
    //     })
    // }

    return { userLocator: userLocator }

  });