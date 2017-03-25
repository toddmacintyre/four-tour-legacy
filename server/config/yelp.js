var yelpAuth = process.env.YELP_AUTH === undefined ? require(__dirname+'../../.env') : process.env.YELP_AUTH

module.exports = {
    options: {  method: 'GET',
                url: 'https://api.yelp.com/v3/businesses/search',
                qs:
                    {   latitude: '40.78',
                        longitude: '-73.95',
                        radius: '1000',
                        categories: 'coffee',
                        limit: '5',
                        sort_by: 'rating' },
                headers:
                    {   authorization: yelpAuth }
            }
};
