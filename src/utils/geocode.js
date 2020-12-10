const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW5raXRrdW1hcjQyMSIsImEiOiJja2k2ejlpOTUwN21kMzRwMjU0cHIwNHg0In0.-TFYGFjIfp64RGpd13Llsw&limit=1';
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Geocode Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Geocode Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;