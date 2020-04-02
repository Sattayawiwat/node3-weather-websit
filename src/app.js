const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geo = require('./utils/geo')
const forcast = require('./utils/forcast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather Application ',
        name: " Sattawiwat"
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'ABOUT ',
        name: " Sattawiwat"
    })
})
app.get('/help', (req,res)=>{
    res.render('help', {
        title: 'Help! Message',
        message: " This is help message"
    })
})

// app.get('*', (req,res)=>{
//     res.render('404', {
//         title: 'PAGE NOT FOUND!',
//         name: " Sattawiwat"
//     })
// })

app.get('/products', (req,res)=>{

    if (!req.query.search){
        return res.send({
            error: " You must provide a search term"
        })
    }
    console.log(req.query.search)

    res.send({
        products:[]
    })
})

// app.get('', (req,res)=>{
//     res.send('Hello Express!')

// })

// app.get('/help', (req,res)=>{

//     res.send('<h1>Help Page!</h1?')

// })

// app.get('/about', (req,res)=>{

//     res.send({
        
//         name: Andrew,
//         age: 27
//     })

// })

app.get('/weather', (req,res)=>{

    const address = req.query.search

    if (!address){
        return res.send({
            error: " You must provide a search address"
        })
    }
   // console.log(address)

   const temperature = geo.geoCode(address,(error,{lon,lat}={})=>{

        if (error){
           //console.log('Error',error)
           return res.send({error})
        }
        //else{ console.log(" Latitude " + data.lat + " Longtitude "+ data.lon)}
        else{ 
            forcast.forcastWeather(lat,lon, (error,d)=>{
                if (error){
                    //console.log('Error',error)
                    return res.send({error})
                }
                else{
                   // const {temperature} = d
                 
                   console.log(d)

                   res.send({

                    temperature :d

                   })
                    
                }
    
            })
        }
        
    })

  console.log()

    // res.send({
    //     products:[]
    // })

    // res.render('weather', {
    //     title: 'Weather',
    //     name: " Sattawiwat",
    //     forecast:"It is raining",
    //     location: address ,
    //     temperature: temperature

    // })

  
})

// app.get('*', (req,res)=>{

//     res.send(

//         'My 404 Page'
        
//       )

// })

//app.com
//app.com/help
//app.com/about

app.listen(port, ()=>{
    console.log('Server is up on ' + port)
})