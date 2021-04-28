// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routesar
var express = require('express');

// Start up an instance of app
var app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));



// Setup Server
const port = 8800;
app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost ${port}`);
});


  // Create a GET route
  app.get('/get', (rrequest, response) => {
      // returns the object named projectData
      response.send(projectData);
      console.log(projectData);
  });

  app.get('/all', (request, response) => {
    response.send(projectData);
    console.log(projectData);
});


// Create a POST route
app.post('/add', (request, response) => {
    entry = {
        location: request.body.location,
        temp: request.body.temp,
        date: request.body.date,
        feelings: request.body.feelings,
        content:  request.body.content
    }

    
    projectData = entry
    console.log(projectData)
    res.send(projectData)
});
