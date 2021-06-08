var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();

//const bodyParser = require('body-parser')
var bodyParser = require('body-parser')

const fetch = require('node-fetch');



console.log(`Your API key is ${process.env.API_KEY}`);

const app = express()
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//app.use(bodyParser.json());

app.use(express.static('dist'))




//console.log(__dirname + '/public')
app.use(express.static(__dirname + '/public'));

     //res.sendFile('dist/index.html')
app.get('/', function (req, res) {
  res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
const port = 8880;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

app.post('/api', async function(req, res) {
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`

    const response = await fetch(apiURL)
    const mcData = await response.json()
    console.log(mcData)
    res.send(mcData)

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
})
