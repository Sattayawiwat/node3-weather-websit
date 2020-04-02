console.log('Client side javascript file is loaded')

// fetch('http://localhost:3000/weather?search=bangkok').then((response)=>{

//         response.json().then((data)=>{
//             if(data.error) {
//             console.log(data.error) 
//             }else {
//                 console.log(data)
//             }

//         })

// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    // Send loation to server side by request
    fetch('/weather?search='+location).then((response)=>{

        response.json().then((data)=>{
            if(data.error) {
            //console.log(data.error) 
            messageTwo.textContent  = data.error
            }else {
               // console.log(data.temperature.temperature)
               messageOne.textContent = data.temperature.temperature
                
            }

        })

})
    console.log(location)
})