const request = require('request')


//request({url: url, json:true },(error, response)=> {

// //     //const data = JSON.parse(response.body)
// //     //console.log( "The temperature out side is " +
        
// //         response.body.currently.temperature + 

// //         " The % change to rain is " +


// //         response.body.currently.precipProbability



const forcastWeather = (lat,lon,callback)=>{
    //const url = 'https://api.darksky.net/forecast/c5c3b975d9ed7d8dd9e8ec19badd6627/37.8267,-122.4233'
   
   const url = 'https://api.darksky.net/forecast/c5c3b975d9ed7d8dd9e8ec19badd6627/'+ lat +',' + lon
   
 
   request({url, json:true},(error,{body})=>{

    //console.log(response.body.currently.temperature)

        if (error){
        //console.log('No internet connection!')
        callback('Not able to connect to web servicess',undefined)
        } 
        else if(body.currently.length === 0){
        callback('Not able to find weather for this location',undefined)
        }
        else{
            callback(undefined,{
                temperature:body.currently.temperature
                
                })

        
        }
// end if cource
    })

}



module.exports = {
    forcastWeather: forcastWeather
}