angular.module('mapApp.home', ['gm','four-tour-svcs'])

.controller('homeCtrl', function($rootScope, $scope, $location, $http, mapping) {

	$scope.useGeo = false;
	$scope.locating = false;
	$scope.pulldownDefault = {name: 'Choose a category'};
	$scope.chosenCategory = $scope.pulldownDefault;
	$scope.categories = [{name: "Coffee", catId: "4bf58dd8d48988d1e0931735"},
											{name: "Food", catId: "4d4b7105d754a06374d81259"},
											{name: "Fun", catId: "4d4b7104d754a06370d81259"},
											{name: "Nightlife",catId: "4d4b7105d754a06376d81259"},
											{name: "Threads", catId: "4bf58dd8d48988d103951735"}];

	$scope.chooseCategory = function(category) {
  	$scope.chosenCategory = category;
  }

  $scope.geoLocate = function() {
  	$scope.locating = true;
  	if ($rootScope.located) {
  		setTimeout(function() {
  			$scope.origin = 'lat: ' + mapping.user.lat + ', lng: ' + mapping.user.lng;
  			$scope.useGeo = true;
  			$scope.locating = false;
    		$scope.$apply();
  		}, 1750);
  	} else {
  		if (navigator.geolocation) {
  			navigator.geolocation.getCurrentPosition(function(position) {
      		$scope.origin = 'lat: ' + position.coords.latitude + ', lng: ' + position.coords.longitude;
        	$scope.useGeo = true;
        	$scope.locating = false;
    			$scope.$apply();
        });
      } else {
      	alert("Sorry, your location couldn't be found. Please enter an address.");
    	}
    }
  };

  $scope.getTour = function() {
  	if(!$rootScope.origin || !$rootScope.destination || $scope.chosenCategory.name === "Choose a category") {
  		alert('Please make sure you have chosen a starting point, destination, and category');
  	} else {
  		$location.path('/map');
  	}
  	//$rootScope.origin and $rootScope.destination have lat/lng coords
  	//$scope.chosenCategory.catId has Foursquare category ID
  };

  $scope.reset = function() {
  	$scope.origin = '';
  	$scope.destination = '';
  	$scope.chosenCategory = $scope.pulldownDefault;
  };

	$scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      var origin = $scope.origin.getPlace().geometry.location;
      var dest = $scope.destination.getPlace().geometry.location;
      $rootScope.origin.lat = origin.lat();
      $rootScope.origin.lng = origin.lng();
      $rootScope.destination.lat = dest.lat();
      $rootScope.destination.lng = dest.lng();
	});

})




/*function fsSearch(position, map) {
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
        //the start and end is based on position which is the current location position not entered
        drawTour(position, map, fsPlacesLatLng);
      }, function(data, status) {
        $scope.fsState = 'noResult';
      });
  };*/