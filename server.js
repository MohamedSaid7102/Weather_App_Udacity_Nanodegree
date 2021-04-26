// variable to hold the Project Data
let projectData = {};
const port = 5502;

const express = require('express'); //importing express with ES6 style
const app = express(); //instantiate an app 
// Project Dependencies
// Cors
const cors = require('cors'); 
app.use(cors());
// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('website')); // making the app pointing to the project folder

/* Spin up the server*/
const server = app.listen(port, ()=>{console.log(`running on http://127.0.0.1:${port}/website/index.html`);});

// Get request
app.get('/',(req, res) => {
  res.send(projectData).status(200); //send back the response with status 200 ' means OK no problems'
});

// Post request
app.post('/', (req, res)=>{
  // first save the request info in the projectData
   projectData = {
     temp: req.body.temp,
     date: req.body.temp,
     feelings: req.body.temp
   };
  //  then send back a response with status 200 and project Data in case we need it 
  res.send(projectData).status(200);
})