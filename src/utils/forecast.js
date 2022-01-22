const request = require('request')


const forecast= (lat , lon , callback)=>{
 const url ='http://api.weatherstack.com/current?access_key=9b5be5369cdbc468f538df5fe4263b25&query='+ lat+','+lon

 request({ url : url, json: true},(error, response)=>{
    if(error){
    callback('Unable to connect to the Weather stack server', undefined)
    }else if(response.body.error){
    callback('Unable to find location', undefined)
    }
    else{
    callback(undefined, 'Currently it is '+response.body.current.weather_descriptions[0]+' '+response.body.current.temperature+' degress out. It feels like '+response.body.current.feelslike+' degrees out.')
    }
 })
}
 module.exports = forecast