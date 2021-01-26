const request = require ('request')


const geocode = (address, callback)=>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=af53ced1ca5293c335c0d9dba63f67ab&query='+ address
    request({url, json: true }, (error, {body})=>{
        if(error){
            callback('Unable to connect to location services! ', undefined)
        }else if(body.data[0].length === 0){
            callback('Unable to find location. Try another search')
        }else{
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].locality
            })
        }
    })
}
module.exports = geocode