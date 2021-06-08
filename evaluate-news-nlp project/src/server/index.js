var path = require('path')
var express = require('express');
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
//const FormData = require('form-data')
const dotenv = require('dotenv')

dotenv.config();
const api_key = process.env.API_KEY;
var app = express();
//const bodyParser = require('cors');
var bodyParser = require('body-parser')
app.use(cors());

//const bodyParser = require('body-parser')
//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(express.static('dist'));
app.use(express.static('website'));

//console.log(__dirname)
// designates what port the app will listen to for incoming requests
const port = 8880;
const server = app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
    //res.sendFile(path.resolve('dist/index.html'))

});




// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.post('/userText', async(req, res) => {
  //const txt = req.body.formText;
  console.log('req.body===+', req.body)


  const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${api_key}&url=${req.body.formText}&lang=en`);
  // .then(response => res.json())
  // .then(response => res.send(res))
  // .catch(error => console.log('error', error));
  try {
        const data = await response.json();
        console.log(data);
        res.send(data);
      }catch (error) {
      console.log("error", error);
      }
    });
