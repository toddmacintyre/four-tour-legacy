angular.module('mapApp.map', [])
.controller('mapCtrl', function($rootScope, $scope, $window, $http) {

  // INITIALIZE GOOGLE MAP

  $scope.initMap = function() {
    var tourMap = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.750222, lng: -73.990282}, // Manhattan
      zoom: 12
    });
    findUser(tourMap);
  };

  // HTML5 GEOLOCATION

  function findUser(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var currPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        fsSearch(currPos, map);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  // FOURSQUARE API CALL

  function fsSearch(position, map) {
    $scope.fsState = 'loading';

    // sets location based on entered location or Geolocation
    var latitude;
    var longitude;
    if($rootScope.address === undefined){
      latitude = position.lat;
      longitude = position.lng;
    } else {
      latitude = $rootScope.lat;
      longitude = $rootScope.lng;
    }
    var data = {"latitude": latitude, "longitude": longitude}
    $http.post('/api/foursquare', data)
      .then(function(result, status) {
        var fsPlaces = result.data.response.groups[0].items;
        var fsPlacesLatLng = [];
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
        $scope.fsState = 'loaded';
        drawTour(position, map, fsPlacesLatLng);
      }, function(data, status) {
        $scope.fsState = 'noResult';
      });
  };

  // SET MAP TO CURRENT POSITION WITH DIRECTIONS FOR TOUR

  function drawTour(position, map, fsWaypoints) {

    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();

    // var infoWindow = new google.maps.InfoWindow({map: map});
    // infoWindow.setPosition(position);
    // infoWindow.setContent('You are here.');

    map.setCenter(position);
    map.setZoom(16);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    var request = {
      origin: position,
      destination: position,
      travelMode: 'WALKING',
      waypoints: fsWaypoints,
      optimizeWaypoints: true
    };

    directionsService.route(request, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  };

  // ERROR HANDLER

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  };

});
