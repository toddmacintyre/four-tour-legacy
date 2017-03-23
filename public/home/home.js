angular.module('mapApp.home', ['gm'])

.controller('homeCtrl', function($rootScope, $scope, $location) {

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
  	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
      	$rootScope.origin.lat = position.coords.latitude;
        $rootScope.origin.lng = position.coords.longitude;
        $scope.origin = 'lat: ' + $rootScope.origin.lat + ', lng: ' + $rootScope.origin.lng;
        $scope.locating = false;
        $scope.$apply();
    	});
    } else {
      alert("Sorry, your location couldn't be found. Please enter an address.");
    }
  };

  $scope.getTour = function() {
  	//$rootScope.origin and $rootScope.destination have lat/lng coords
  	//$scope.chosenCategory.catId has Foursquare category ID
  }

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
