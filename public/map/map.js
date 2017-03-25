angular.module('mapApp.map', [])
.controller('mapCtrl', function($rootScope, $scope, $window, $http, $location) {

  // INITIALIZE GOOGLE MAP

        $rootScope.mapRender = true;
        $rootScope.$on("$locationChangeStart", function() {
            console.log($location.path())
            if ($location.path() === "/map") {
                $rootScope.mapRender = true;
            } else {
                $rootScope.mapRender = false;
                $("#wrapper").removeClass("toggled");
            }
        });

        $scope.initMap = function() {
            var tourMap = new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: 40.750222,
                    lng: -73.990282
                }, // Manhattan
                zoom: 12
            });
            //fsSearch(tourMap);
            getYelp(tourMap);
        };

        // SET MAP TO CURRENT POSITION WITH DIRECTIONS FOR TOUR

        function drawTour(position, map, fsWaypoints, yelpData) {
            function similarity(s1, s2) {
                var longer = s1;
                var shorter = s2;
                if (s1.length < s2.length) {
                    longer = s2;
                    shorter = s1;
                }
                var longerLength = longer.length;
                if (longerLength == 0) {
                    return 1.0;
                }
                return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
            }

            function editDistance(s1, s2) {
                s1 = s1.toLowerCase();
                s2 = s2.toLowerCase();

                var costs = new Array();
                for (var i = 0; i <= s1.length; i++) {
                    var lastValue = i;
                    for (var j = 0; j <= s2.length; j++) {
                        if (i == 0)
                            costs[j] = j;
                        else {
                            if (j > 0) {
                                var newValue = costs[j - 1];
                                if (s1.charAt(i - 1) != s2.charAt(j - 1))
                                    newValue = Math.min(Math.min(newValue, lastValue),
                                        costs[j]) + 1;
                                costs[j - 1] = lastValue;
                                lastValue = newValue;
                            }
                        }
                    }
                    if (i > 0)
                        costs[s2.length] = lastValue;
                }
                return costs[s2.length];
            }
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer({
                // suppressMarkers: true,
                // suppressInfoWindows: true,
                polylineOptions: {
                    strokeColor: "green"
                }
            });

            map.setCenter(position);
            map.setZoom(15);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById('directions-panel'));
            var request = {
                origin: position,
                destination: position,
                travelMode: google.maps.TravelMode.WALKING, //'WALKING',
                waypoints: fsWaypoints,
                optimizeWaypoints: true
            };

            var placeIds = []
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 400
            });
            var service = new google.maps.places.PlacesService(map);
            directionsService.route(request, function(response, status) {
                var yelpObject = {};
                response.geocoded_waypoints.forEach(function(elle, index) {
                    service.getDetails({
                        placeId: elle['place_id']
                    }, function(place, status) {
                        yelpData.forEach(function(object) {
                            // console.log(similarity(object.name, place.name), " yel ", object.name, " gog ", place.name)
                            if (similarity(object.name, place.name) > 0.83) // Comparing names of places from yelp with google
                                yelpObject[place.name] = object;            // Names differ which results in errors.
                        })

                        var imageUrls = [];
                        if (place.photos) {
                            place.photos.forEach(function(object) {
                                var urlPic = object.getUrl({
                                    'maxWidth': 600,
                                    'maxHeight': 600
                                })
                                imageUrls.push(urlPic);
                            })
                        }
                        var icon = "https://s15.postimg.org/rlm6kl1rf/iconiccopy.png";
                        var marker = new google.maps.Marker({
                            map: map,
                            icon: "/img/icon.PNG",
                            position: place.geometry.location,
                            optimized: false
                        });

                        var template =
                            '<div id="infoWin1">' +
                            '<div class="placeTitle">' + place.name + '</div>' +
                            '<br>' + place.formatted_address +
                            '<br>' + '<a style="color:blue;" target="_blank" href="+ place.url + ">' + "Google Maps Link." + '</a>' +
                            '<br>' +
                            '</div>'
                        var imageTemplate =
                            '<div id="infoWin2">' +
                            '<div class="placeTitle">' + place.name + '</div>' +
                            '<div class = "placeSubTitle">' + place.formatted_address + '</div>' +
                            '<div class="infoImage">' +
                            '<img src = ' + imageUrls[0] + '>' +
                            '<img src =' + imageUrls[1] + '>' +
                            '<img src =' + imageUrls[2] + '>' +
                            '</div><br>' +
                            '<div class="telAndLink">' +
                            '<a style="color:blue;" target="_blank" href="+ place.url + ">' + "Google Maps Link." + '</a><br>' +
                            "Tel: " + place.formatted_phone_number +
                            '</div>' +
                            '</div>'

                        google.maps.event.addListener(marker, 'click', function() {
                            if (imageUrls.length === 0) {
                                infowindow.setContent(template);
                            } else if (yelpObject[place.name]) {
                                var yelpTemplate =
                                    '<div id="infoWin2">' +
                                    '<div class="placeTitle">' + place.name + '</div>' +
                                    '<div class = "placeSubTitle">' + place.formatted_address + '</div>' +
                                    '<div class="infoImage">' +
                                    '<img src = ' + imageUrls[0] + '>' +
                                    '<img src =' + imageUrls[1] + '>' +
                                    '<img src =' + imageUrls[2] + '>' +
                                    '</div><br>' +
                                    '<div class="trp">' +
                                    "Tel: " + place.formatted_phone_number + '</div>' +
                                    '<div class ="trp">' + "Yelp Rating: " + yelpObject[place.name].rating + '</div>' +
                                    '<div class ="trp">' + "Price: " + yelpObject[place.name].price + '</div>' +
                                    '<div class ="mapsLink">' + '<a style="color:blue;" target="_blank" href="' + place.url + '"> Google Link.</a></div>' +
                                    '<div class ="yelpLink">' + '<a style="color:blue;" target="_blank" href="' + yelpObject[place.name].url + '"> Yelp Link.</a></div><br>' +
                                    '</div>'
                                infowindow.setContent(yelpTemplate);
                            } else {
                                infowindow.setContent(imageTemplate);
                            }
                            var that = this;
                            setTimeout(function() {
                                    infowindow.open(map, that);
                                }, 500)
                                // infowindow.open(map, this);
                        });
                        google.maps.event.addListener(infowindow, 'closeclick', function() {
                            map.setCenter(position);
                            map.setZoom(15);
                        });
                    })

                })

                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                }
            });
        };

        function getYelp(map) {
            var qs = {
                latitude: $rootScope.coords.lat,
                longitude: $rootScope.coords.lng,
                radius: $rootScope.radius,
                categories: $rootScope.chosenCategoryId,
                limit: $rootScope.limit,
                sort_by: $rootScope.sortBy
            };
            $http.post('/api/yelp', qs)
                .then(function(result, status) {
                    var yelpPlaces = result.data.businesses;
                    var yelpPlacesData = [];
                    var yelpData = [];
                    yelpPlaces.forEach(function(place) {
                        var addressString = `${place.name}, ${place.location.address1}, ${place.location.city}, ${place.location.state}, ${place.location.country}`;
                        console.log(addressString);
                        yelpPlacesData.push({
                            location: addressString,
                            stopover: true
                        });
                        yelpData.push({
                            name: place.name,
                            rating: place.rating,
                            price: place.price,
                            url: place.url
                        });
                    });
                    $scope.fsState = 'loaded';
                    console.log(yelpPlacesData, "waypointsssss");
                    //the start and end is based on position which is the current location position not entered
                    // setTimeout(function(){
                    drawTour($rootScope.coords, map, yelpPlacesData, yelpData);
                })
                .catch(function(error) {
                    console.log('FRONTEND YELP API ERROR = ', error);
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

