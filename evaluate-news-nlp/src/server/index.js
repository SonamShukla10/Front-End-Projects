var path = require('path')
const express = require('express')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
//const FormData = require('form-data')
const dotenv = require('dotenv')
const bodyParser = require('cors')



dotenv.config();
const api_key = process.env.API_KEY;
const app = express();
app.use(cors());
app.use(bodyParser.json);
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(bodyParser.json);

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile(path.resolve('dist/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});

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
