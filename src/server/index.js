var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser')
const fetch = require('node-fetch');



console.log(`Your API key is ${process.env.API_KEY}`);

const app = express()
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname + '/public')

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})

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
