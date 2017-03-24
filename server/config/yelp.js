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
                    {   authorization: 'Bearer jC_tU-Vssh8bT9a5xSIpkabqPZIUSRcY_clNDZuDiq10c5Ke_HdM-u0zSB_NBCeHL_UzJgpb5DH0w5_fyM8BsGF7Px5ulMkVT6itwNp_HHusuuSb3oxTVwFe83LVWHYx' }
            }
};
