angular.module('mapApp.map', [])
.controller('mapCtrl', function($rootScope, $scope, $window) {
  console.log($rootScope.lat, $rootScope.lng)
  var uluru = {lat: $rootScope.lat, lng: $rootScope.lng}
  var manhattan = new google.maps.LatLng(40.7711329, -73.9741874);



  // FOURSQAURE API

  $scope.fsSearch = function() {
    $scope.obj.state = 'isLoading';

    var clientID = "EVECKUKAZVISXZUT0E3ICP15RYP00DE4YJWULGVNLNXQ1KP4";
    var clientSecret = "NEIRV3V5KG1GMMZAJHTHZPPM5VLYBKVJD4K1AKVQGQ0LMYJN";

    $http.get("https://api.foursquare.com/v2/venues/explore/?ll=" + uluru.lat + "," + uluru.lng + "&limit=5&radius=1600&section=arts&openNow=1&sortByDistance=1" + "&client_id=" + clientID + "&client_secret=" + clientSecret)
      .then(function(result, status) {
        fsPlaces = result.data.response.groups[0].items;
        fsPlacesLatLng = [];
        fsPlaces.forEach(function(place) {
          fsPlacesLatLng.push(
            {
              location: {
                lat: place.venue.location.lat, 
                lng: place.venue.location.lng
              },
              stopover: true
            }
          );
        });

        $scope.obj.state = 'loaded';
        $scope.tourWayPoints = fsPlacesLatLng;
      }, function(data, status) {
        $scope.obj.state = 'noResult';
      });
    };



  // GOOGLE API

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

      // ADD FROM FOURSQUARE DATA
      waypoints: $scope.tourWayPoints,
      optimizeWaypoints: true,
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
