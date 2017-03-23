angular.module('mapApp.map', [])
.controller('mapCtrl', function($rootScope, $scope, $window, $http, $location) {

  // INITIALIZE GOOGLE MAP
  
  $rootScope.mapRender = true;
  $rootScope.$on("$locationChangeStart", function() {
    // This will run on every location change, before the
    // whole route is processed. Good for things like Identity
    // management.
    console.log($location.path())
    if ($location.path() === "/map") {
      $rootScope.mapRender = true;
    } else {
      $rootScope.mapRender = false;
    }
    
    console.log($rootScope.mapRender);
  });

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
        // console.log(result, "RESULT from FOURSQUARE")
        var fsPlaces = result.data.response.groups[0].items;
        var fsPlacesLatLng = [];

        // fsPlaces.forEach(function(place){
        //   var addressString = `${place.venue.name}, ${place.venue.location.address}, ${place.venue.location.city}, ${place.venue.location.state}, ${place.venue.location.cc}`;
        //   var request = {
        //     location: map.getCenter(),
        //     radius: '500',
        //     query: addressString
        //   };
        //   var service2 = new google.maps.places.PlacesService(map);
        //   service2.textSearch(request, callback);
        //   function callback(result, status){
        //     console.log(result[0].place_id, "***********");
        //     fsPlacesLatLng.push(
        //     {
        //       location:{placeId:result[0].place_id},//addressString,
        //       stopover: true
        //     }
        //   );
        //   }
        // })


        fsPlaces.forEach(function(place) {
          var addressString = `${place.venue.name}, ${place.venue.location.address}, ${place.venue.location.city}, ${place.venue.location.state}, ${place.venue.location.cc}`;
          console.log(addressString);
          fsPlacesLatLng.push(
            {
              location:addressString,
              stopover: true
            }
          );
        }); 

        $scope.fsState = 'loaded';
        console.log(fsPlacesLatLng, "waypointsssss");
        //the start and end is based on position which is the current location position not entered
        // setTimeout(function(){
          drawTour(position, map, fsPlacesLatLng);
        // }, 6000)
        // drawTour(position, map, fsPlacesLatLng);
      }, function(data, status) {
        $scope.fsState = 'noResult';
      });
  };

  // SET MAP TO CURRENT POSITION WITH DIRECTIONS FOR TOUR

  function drawTour(position, map, fsWaypoints) {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer(
      {
        // suppressMarkers: true,
        // suppressInfoWindows: true, 
        polylineOptions: { strokeColor: "green" }
      });

    
    // var stepDisplay = new google.maps.InfoWindow;
    // var markerArray = [];


    // var infoWindow = new google.maps.InfoWindow({map: map});
    // infoWindow.setPosition(position);
    // infoWindow.setContent('You are here.');

    map.setCenter(position);
    map.setZoom(16);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));
    // $rootScope.mapRender = true;
    // console.log(`$rootScope.mapRender = ${$rootScope.mapRender}`);
    // position is geolocation (would like to change to be changed if entered a location)
    var request = {
      origin: position,
      destination: position,
      travelMode: google.maps.TravelMode.WALKING, //'WALKING',
      waypoints: fsWaypoints,
      optimizeWaypoints: true
    };

    var placeIds = []
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    directionsService.route(request, function (response, status) {
      // console.log(response, "RESPONse from google ROUTES")

      response.geocoded_waypoints.forEach(function(elle){
      // placeIds.push(elle.place_id);
      // console.log('elleplc IDIDIID',elle['place_id'])
      service.getDetails({placeId:elle['place_id']}, function(place, status){
        // console.log(place, "plac!!!!!!!!!!!!!!!!!!!!!!")
        var imageUrls = [];
        if(place.photos){
          place.photos.forEach(function(object){
            var urlPic = object.getUrl({'maxWidth': 200, 'maxHeight': 200})
            imageUrls.push(urlPic);
          })
        }
        var icon = "https://s15.postimg.org/rlm6kl1rf/iconiccopy.png";
        var marker = new google.maps.Marker({
          map: map,
          icon:"/img/icon.PNG",
          position: place.geometry.location
        });

        // markerArray.push(marker);
        console.log(imageUrls, "URLSSSSS");
        var template =  "<div class='infoWin1' style='width:250px; height:250px;'><strong style='font-size: 20px;'>" + place.name + "</strong>" +
            "<br>" + place.formatted_address +
            "<br>" + "<a style='color:blue;' target='_blank' href='"+ place.url + "'>" + place.url +"</a>" +
            "<br>" + "Tel: " + place.formatted_phone_number + "</div>"
        var imageTemplate = "<div class='infoWin2' style='width:550px; height:250px;'><strong style='font-size: 20px;'>" + place.name + "</strong>" +
            "<br>" + place.formatted_address + '<br>'+ '<div class="infoImage"><img src =' +  imageUrls[0] +' >' +'<img src =' + imageUrls[1] +' >' + '<img src =' + imageUrls[2] +' ></div>' +
            "<br>" + "<a style='color:blue;' target='_blank' href='"+ place.url + "'>" + place.url +"</a>" +
            "<br>" + "Tel: " + place.formatted_phone_number + "</div>"

        google.maps.event.addListener(marker, 'click', function() {
          if(imageUrls.length === 0){
            infowindow.setContent(template);
          } else {
            infowindow.setContent(imageTemplate);
          }
          infowindow.open(map, this);
        });
      })

    })

      // calculateAndDisplayRoute(directionsDisplay, directionsService, markerArray, stepDisplay, map);
      // function calculateAndDisplayRoute(directionsDisplay, directionsService,
      //     markerArray, stepDisplay, map) {
      //   // First, remove any existing markers from the map.
      //   for (var i = 0; i < markerArray.length; i++) {
      //     markerArray[i].setMap(null);
      //   }

        // Retrieve the start and end locations and create a DirectionsRequest using
        // WALKING directions.
      //   directionsService.route(request, function(response, status) {
      //     // Route the directions and pass the response to a function to create
      //     // markers for each step.
      //     if (status === 'OK') {
      //       // document.getElementById('warnings-panel').innerHTML =
      //       //     '<b>' + response.routes[0].warnings + '</b>';
      //       directionsDisplay.setDirections(response);
      //       showSteps(response, markerArray, stepDisplay, map);
      //     } else {
      //       window.alert('Directions request failed due to ' + status);
      //     }
      //   });
      // }


      // function showSteps(directionResult, markerArray, stepDisplay, map) {
      //   // For each step, place a marker, and add the text to the marker's infowindow.
      //   // Also attach the marker to an array so we can keep track of it and remove it
      //   // when calculating new routes.
      //   var myRoute = directionResult.routes[0].legs[0];
      //   for (var i = 0; i < myRoute.steps.length; i++) {
      //     var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
      //     marker.setMap(map);
      //     marker.setPosition(myRoute.steps[i].start_location);
      //     attachInstructionText(
      //         stepDisplay, marker, myRoute.steps[i].instructions, map);
      //   }
      // }

      // function attachInstructionText(stepDisplay, marker, text, map) {
      //   google.maps.event.addListener(marker, 'click', function() {
      //     // Open an info window when the marker is clicked on, containing the text
      //     // of the step.
      //     stepDisplay.setContent(text);
      //     stepDisplay.open(map, marker);
      //   });
      // }



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
