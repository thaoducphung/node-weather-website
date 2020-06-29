request = require('request')

const geocode = (address,callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoid2h5aW1kaWUiLCJhIjoiY2tibDVweXhmMDR4YzJybjh0OTZhaTJkMyJ9.ZLOh9wORvkG4Ftrr_Wqn7Q&limit=1'
    request({url,json:true},(error, {body})=>{
        if (error){
            // console.log('Unable to connect to geocoding service!')
            callback('Unable to connect to location service!',undefined)
        } else if (!body.features){
            callback('Unable to find location. Try another search!',undefined)
        } else if (body.features.length===0){
            callback('Unable to find location. Try another search!',undefined)
        }else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode

// geocode('New York',(error,data)=>{
//     // if (error) {
//     //     console.log(error)
//     // }
//     console.log('Error:',error)
//     console.log('Data:',data)
// })
