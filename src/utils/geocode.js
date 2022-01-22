const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ3VyZGVlcDAwNyIsImEiOiJja3lpaTVwbmIxZ2Y1Mm9zODE4YTN3NDBnIn0.SI7v_egPW4eqaJye-pmWqw&limit=1'
    request({ url : url, json: true},(error, response)=>{
        if(error){
           callback('Unable to connect to location services', undefined)
        }else if(response.body.features.length===0){
            callback( 'Unable to find location', undefined)
        }else{
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        const location = response.body.features[0].place_name
        callback(undefined,{latitude,longitude,location})
        }
})
}
module.exports = geocode