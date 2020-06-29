// console.log('Client side javascript file is loaded!')


fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

// fetch('http://localhost:3000/weather?address=Ho Chi Minh District 1').then((response)=>{
//     response.json().then((data)=>{
//         if (data.error){
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecastData)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From JavaScript'

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit',(e)=>{
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    e.preventDefault()
    const location = search.value 
    // console.log('Testing!')
    // console.log(location)
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecastData)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
            }
        })
    })
})
