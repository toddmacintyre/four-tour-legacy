angular.module('mapApp.home', [])
.controller('homeCtrl', function($rootScope, $scope, $location) {

  $scope.enterAddress = function(){
	$location.path('/map');
	console.log($rootScope.address)
  }
})

.directive('googleplace', function($rootScope) {
	return {
		require : 'ngModel',
		link : function(scope, element, attrs, model) {
			var options = {
				types : [],
			};
			//creating new autocomplete object when searching in input bar
			scope.gPlace = new google.maps.places.Autocomplete(element[0],
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
