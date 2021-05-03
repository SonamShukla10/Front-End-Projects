/* Global Variables */
 let baseUrl ='api.openweathermap.org/data/2.5/weather?q=';
 // 'http://api.openweathermap.org/data/2.5/weather?newWeather=';
let apiKey = 'Sonam&appid=29ffe73e4218f0e4dce19128713ad41d';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
const newWeather =  document.getElementById('weather');
const feelings = document.getElementById('feelings');

getWeather(baseUrl ,newWeather , apiKey )
.then (function(data) {
    console.log(data);
    postData('/addWeather' ,{temp:data.main.temp ,date:newDate, feeling:feeling})
    //{`${baseUrl}newWeather=${weather}&appid=${apiKey}`} )
  })
  .then(
      updateInfo()
    )

  };


const getWeather = async (baseUrl, newWeather, key)=>{
  const res = await fetch(baseUrl+newWeather+apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
    postData('/add', {
      location : data.main.location,
      temp: data.main.temp,
      date: newDate(),
      feelings: data.main.feelings,
        })
    }
    catch(error) {
      console.log("error", error);
    // appropriately handle the error
  }
};


// ######################################################
const postData = async ( url = '', data = {})=>{

      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

      try {
        const newData = await response.json();
               return newData
      }catch(error) {
      console.log("error", error);     // error handling
      }
  }


// ########################################################
const newData = async (url='') =>{
    const req = await fetch(url);
    try {
        const newData = await req.json()
    }
    catch(error){
        console.log('error', error);
    }
};


function tempConversion(kelvin) {
    let celsius = Math.floor(kelvin - 273)
    return `${celsius}°C`
}



const updateInfo = async (url = '') => {
    const req = await fetch('/all');
    try {
        const fullData = await req.json();
        document.getElementById('date').innerHTML = fullData.date;
        document.getElementById('temp').innerHTML = tempConversion(fullData.temp);
        document.getElementById('content').innerHTML = `Your feeling: ${fullData.feelings}`;
        document.getElementById('location').innerHTML = fullData.location;
        console.log(fullData)
    } catch(error) {
        console.log("error", error);
    }
  }
// ########################################################
