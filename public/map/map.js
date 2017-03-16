angular.module('mapApp.map', [])
.controller('mapCtrl', function($rootScope, $scope, $window) {
  console.log($rootScope.lat, $rootScope.lng)
  var uluru = {lat: $rootScope.lat, lng: $rootScope.lng}

  var manhattan = new google.maps.LatLng(40.7711329, -73.9741874);
  $window.map = new google.maps.Map(document.getElementById('map'), {
    control: {},
    zoom: 12,
    center: manhattan
  });
  $window.marker = new google.maps.Marker({
    position: uluru,
    map: map
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({map: $window.map});
  var stepDisplay = new google.maps.InfoWindow;

  $scope.request = {
      origin: $scope.origin,
      destination: $scope.destination,
      travelMode: 'WALKING'
    };

  $scope.getDirections = function () {
      console.log($scope.request);
      directionsService.route($scope.request, function (response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap($window.map);
        directionsDisplay.setPanel(document.getElementById('directions-panel'));
      } else {
        alert('Does not work bruh');
      }
      });
    }
});
