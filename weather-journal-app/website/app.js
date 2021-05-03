/* Global Variables */
 let baseUrl ='http://api.openweathermap.org/data/2.5/weather?q=';
 // 'http://api.openweathermap.org/data/2.5/weather?newWeather=';
let apiKey = 'Sonam&appid=29ffe73e4218f0e4dce19128713ad41d';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });


document.getElementById('generate').addEventListener('click', performAction);

function performAction(event){
const newWeather =  document.getElementById('zip');
const feelings = document.getElementById('feelings');

getWeather(baseUrl ,newWeather , apiKey )
.then (function(data) {
    console.log(data);
    postData('/addWeather' ,{temp:data.list[0].main.temp ,date:newDate, feelings:feelings})
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
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        //boilerplate
        method: 'POST',
        credentials: 'same-origin',
        headers: {
        'Content-Type': 'application/json',
        },
        //Body data type must match Content-Type
        body: JSON.stringify(data),
});

try {
      const newData = await res.json();
      console.log(newData);
      return newData;
  } catch(error) {
      console.log('error', error);
  };
}


// ########################################################
const getData = async (url='') =>{
    const request = await fetch(url);
    try {
        const getData = await request.json()
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
        document.getElementById('date').innerHTML = `Date: ${fullData.date}`;
        document.getElementById('temp').innerHTML = tempConversion(fullData.temp);
        document.getElementById('feelings').innerHTML = `Your feeling: ${fullData.feelings}`;
        document.getElementById('location').innerHTML = fullData.location;
        console.log(fullData)
    } catch(error) {
        console.log("error", error);
    }
  }
// ########################################################
