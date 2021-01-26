const request = require ('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d611b195de95dd0a9388d38fcdf07ba7&query='+ latitude +','+  longitude
    request({url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to retrieve weather data! ', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, body.current.observation_time + ' It is currently ' + body.current.temperature + ' degrees out. There is a ' + body.current.precip + '% chance of rain.')
        }
    })
}
module.exports = forecast