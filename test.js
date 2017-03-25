// var assert = require('assert');
var assert = require('chai').should();
// var request = require('request');
var axios = require('axios');


// test the test
describe('Test the Test', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(4).should.equal(-1);
    });
  });
});

describe('POST /api/geocode', function() {
  it('responds with status 200', function(done) {
    // Send a POST request 
    axios({
      method: 'post',
      url: 'http://localhost:7337/api/geocode',
      data: {
        search: 'latlng=40.7504644,-73.976815'
      },
      timeout: 10000,
      responseType: 'application/json'
    })
    // axios.post('http://localhost:7337/api/geocode', {
    //     search: 'latlng=40.7504644,-73.976815'
    //   })
      .then(function (response) {
        // console.log('+++++=+=+=+', response.data, '++++++++++++');
        response.status.should.equal(200);
        return done();
      })
      .catch(function (error) {
        throw new Error(error);
        return done();
      });
  });
});


// describe('POST /api/geocode', function() {
//   it('respond with json', function(done) {
//     // let req = {body: {search: 'latlng=40.7504644,-73.976815'}};
//     // request.post('http://service.com/upload', {form:{key:'value'}})
//     request.post({url:'localhost:7337/api/geocode', body: {search: 'latlng=40.7504644,-73.976815'}}, function(err,httpResponse,body){
//       console.log('+++++++++++++++', body, '+++++++++++++');
//       console.log('+++++++++++++++', httpResponse, '+++++++++++++');
//       done();
//     })
//   });
// });



// describe('Maps', function() {
//   var $rootScope;
//   var $location;

//   beforeEach(function() {
//     module('mapApp');
//     inject(function(_mapCtrl_, _$rootScope_, _$location_) {
//       $rootScope = _$rootScope_;
//       $location = _$location_;
//     });
//     $location.path("/");
//   });

//   describe('mapRender', function() {
//     it('should set mapRender to true when visiting /map', function() {
//       $location.path("/map");
//       $rootScope.mapRender.should.equal(true);
//     });
//   });

// });