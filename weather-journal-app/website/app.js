/* Global Variables */
let baseUrl = 'http://api.weatherinfo.org/data/1.0/weather?';
const apiKey = 'FXjLYVAr0qoqFfsbLXcUVyficEaKl0r8VixF5LqG';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });


document.getElementById('generate').addEventListener('click', clickAction);
function clickAction(ele) {
  const pinCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  console.log(newDate);
  getTemp(baseUrl, pinCode, apiKey)
  .then(function (data) {
    allData('http://localhost:8800/addWeatherData', {temp: data.main.temp, location: data.main.location, date: newDate, user_response: feelings } )
        .then(function() {
            updatesUserInterface()
        })
    })
}

//async
const getTemp = async(baseUrl, code, apiKey)=> {
  const response = await fetch(baseUrl + code + ',us' + '&appId=' + apiKey)
  console.log(response);
  try {
    const data = await response.json();
    console.log(data);
    console.log('SONAM');
    return data;
  }
  catch(error) {
    console.log("Error", error);
  }
}

const allData = async (url = '', data = {})=> {
  const allRequest = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data);
  });
  try {
    console.log('PARA');
    const newData = await allRequest.json();
    console.log(newData, 'SONAM PARA');
    return newData;
  }
  catch(error) {
    console.log("Error", error);
  }
}

//updates
const updatesUserInterface = async () => {
  const request = await fetch('http://localhost:8800/all');
  try {
        const fullData = await request.json();
        console.log('AREA');
        document.getElementById('date').innerHTML = fullData.date;
        document.getElementById('temp').innerHTML = fullData.temp;
        document.getElementById('content').innerHTML = fullData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}
}





  })
}
