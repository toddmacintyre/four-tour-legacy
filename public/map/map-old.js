angular.module('mapApp.map', [])
.controller('mapCtrl', function($scope, $window) {
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
    destination: $scope.origin,
    travelMode: 'WALKING',
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