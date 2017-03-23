angular.module('mapApp.home', [])
.controller('homeCtrl', function($rootScope, $scope, $location) {

	$scope.pulldownDefault = 'Choose a category';
	$scope.chosenCategory = $scope.pulldownDefault;
	$scope.categories = [{name: "Coffee", catId: "4bf58dd8d48988d1e0931735"},
											{name: "Food", catId: "4d4b7105d754a06374d81259"},
											{name: "Fun", catId: "4d4b7104d754a06370d81259"},
											{name: "Nightlife",catId: "4d4b7105d754a06376d81259"},
											{name: "Threads", catId: "4bf58dd8d48988d103951735"}];

  // $scope.enterAddress = function() {
		// $location.path('/map');
		// console.log($rootScope.address)
  // }

  $scope.chooseCategory = function(category) {
  	$scope.chosenCategory = category.name;
  }

  $scope.geoLocate = function() {
  	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $rootScope.origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
				$scope.origin = 'lat: ' + $rootScope.origin.lat + ', lng: ' + $rootScope.origin.lng;
    	});
    } else {
      // Browser doesn't support Geolocation - DEAL WITH THIS!!!
      handleLocationError(false, infoWindow, map.getCenter());
    }
  };


  $scope.reset = function() {
  	$scope.origin = '';
  	$scope.destination = '';
  	$scope.chosenCategory = $scope.pulldownDefault;
  }

})

.directive('googleplace', function($rootScope) {
	return {
		require : 'ngModel',
		link : function($scope, element, attrs, model) {
			var options = {};
			//creating new autocomplete object when searching in input bar
			$scope.gPlace = new google.maps.places.Autocomplete(element[0],
					options);
			// on exiting search, it will listen for entered string before submitting
			google.maps.event.addListener(scope.gPlace, 'place_changed',
				function() {
				  var geoComponents = scope.gPlace.getPlace();
				  var latitude = geoComponents.geometry.location.lat();
				  var longitude = geoComponents.geometry.location.lng();
					scope.$apply(function() {
					  // element.val is the searched address
						model.$setViewValue(element.val());
						//rootscope here allows for the other controllers to have access to these values
						$rootScope.lat = latitude;
						$rootScope.lng = longitude;
						console.log(element.val())
						console.log(latitude, longitude)
					});
				});
		}
	};
});
