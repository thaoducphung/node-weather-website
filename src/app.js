const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const { response } = require('express')

console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname,'../public'))
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectioryPath = path.join(__dirname,'../public')
const viewDirectoryPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Setup handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectioryPath))

app.get('',(req,res)=>{
    // res.render('index')
    // res.render(path.join(viewDirectoryPath,'index'),{
    res.render('index',{
        webName:'Weather',
        title: 'Weather',
        name: 'Thao Phung'
    })
})

app.get('/about',(req,res)=>{
    // res.render(path.join(viewDirectoryPath,'about'),{
    res.render('about',{
        webName:'About',
        title: 'About',
        name: 'Thao Phung'
    })
})

app.get('/help',(req,res)=>{
    // res.render(path.join(viewDirectoryPath,'help'),{
    res.render('help',{
        webName:'Help',
        title: 'Help',
        name: 'Thao Phung'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide a address term'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if (error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecastData,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast:'It is snowing',
    //     location:'vietnam',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        errorMessages:'Help article not found',
        name:'Thao Phung'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        errorMessages:'My 404 Page',
        name:'Thao Phung'
    })
})
app.listen(port,()=>{
    console.log('Server is up on port '+port)
})

// app.get('',(req,res)=>{
//     // res.send('Hello express!')
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//     // res.send('Help page')
//     res.send([{
//         name:'Thao',
//         age:27
//     },{
//         name:'Anh',
//         age:23
//     }])
// })

// app.get('/about',(req,res)=>{
//     // res.send('About page')
//     res.send('<h1>About</h1>')
// })



// app.com
// app.com/help
// app.com/about

