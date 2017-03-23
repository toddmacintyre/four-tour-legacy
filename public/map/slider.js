// // Menu Toggle Script
// $("#menu-toggle").click(function (e) {
//   e.preventDefault();
//   $("#wrapper").toggleClass("toggled");
// });

angular.module('mapApp.slider', [])
.controller('sliderCtrl', function($scope) {
  $scope.showDirections = function() {
    $("#wrapper").toggleClass("toggled");
  }
});