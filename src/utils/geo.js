const request = require('request')

const geoCode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2F0dGF5YXdpd2F0IiwiYSI6ImNrOGNwOXN4MjBsdjIzZnQ3cHR1cnlpN2IifQ.X4QGbJY39uNsdh44Ezrkuw&limit=1'
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2F0dGF5YXdpd2F0IiwiYSI6ImNrOGNwOXN4MjBsdjIzZnQ3cHR1cnlpN2IifQ.X4QGbJY39uNsdh44Ezrkuw&limit=1'
    request({url, json:true}, (error,{body})=>{

        if(error){
            //console.log('Can not connected!')
            return callback('Unable to connect to location services!',undefined)
        }
        else if(body.features.length === 0){
            //console.log('Missing location')
             return callback('Unable to find to location',undefined)
           // console.log(response.body.features)

        }
        
        else{
            callback(undefined,{
                
                lon:body.features[0].center[0],
                lat:body.features[0].center[1]
                })
           // console.log(body.features[0].center)
        }
    })

}

module.exports = {

geoCode: geoCode

}