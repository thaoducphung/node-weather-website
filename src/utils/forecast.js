const request = require("request")


const forecast = (latitude,longitude,callback) =>{
    const url ='http://api.weatherstack.com/current?access_key=0e07de52e38d65d3111e677dcbb99ed3&query='+latitude+','+longitude+''
    // console.log(url)
    request({url,json:true},(error,{body})=>{
        // console.log(response)
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location. Please try different one!',undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0]+
                '. It is currently '+body.current.temperature+
                ' degrees (Feelslike: '+body.current.feelslike+
                '). There is a '+body.current.precip+'% chance of rain. The hudmidity is '
                +body.current.humidity+', and the UV index is '+body.current.uv_index+'.'
            // {
            //     weather_descriptions: body.current.weather_descriptions[0],
            //     temperature: body.current.temperature,
            //     feelslike: body.current.feelslike,
            //     precip:body.current.precip
            // }
            )
        }
    })
}

module.exports = forecast

