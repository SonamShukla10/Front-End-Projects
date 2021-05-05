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





  // Create a GET route
  app.get('/getData', (req, res) => {
      // returns the object named projectData
      res.send(projectData);
      console.log('projectData');
  });



  app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});


// Create a POST route
app.post('/addWeather', (req, res) => {
    entry = {
      location : req.body.location;
        temp: req.body.temp,
        date: req.body.date,
        feelings : req.body.feelings
    }



    app.post('/add', (req, res) => {
      console.log(res.body);
      res.send("Thanks for info!");
    });


    projectData = entry
    console.log(projectData)
    res.send(projectData)
});

// Setup Server
const port = 8800;
app.listen(port, () => {
    console.log('server running');
    console.log(`running on localhost ${port}`);
});

