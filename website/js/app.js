const apiURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=59e0d5f5baf090f6f7592d8cab459b15';// Personal API Key for OpenWeatherMap API
const unitInClsius = '&units=metric';

const output = document.getElementById('entryHolder');
const zipCodeContainer = document.getElementById('zip');
const feelingsContainer = document.getElementById('feelings');
const GenerateWeatherByZip = document.getElementById('generate');
const dateOutputContainer = document.getElementById('date_result');
const tempOutputContainer = document.getElementById('temp_result');
const feelingsOutputContainer = document.getElementById('content_result');

// TODO: set a container for advises on the output place


// Event listener to add function to existing HTML DOM element
GenerateWeatherByZip.addEventListener('click',getWeatherByZipCode);

/* Function called by event listener */
//  I made this function as an async js function and 'postData()' with .then()
async function getWeatherByZipCode() {
  let data = {
    zipCode: zipCodeContainer.value,
    date: getDate(),
    feelings: feelingsContainer.value
  }

  const res = await fetch(apiURL+data.zipCode+unitInClsius+apiKey); //fetch inforamtions from the API.
    
  if(!res.ok){
    alertError('zip code is not correct ! -- Reloading in 3 seconds');
    setTimeout(() => {
      location.reload();
    }, 4000);
    return;
  }

  let weatherData = {};

  try{
    weatherData = await res.json(); //converst the response to Json to deal with it
  } catch(error){
    alertError(erorr);
  }

  data.temp = await weatherData.main.temp;
  
  postData(`/postData`, data);

  console.log (data);
}


// to post data to server & I didn't make it async case I don't need to I like to work with '.then()' it's more clean & I made the 'getWeatherByZipCode()' async to meet the rubrics Criterias, I hope that dosn't make a problem.
function postData(url='', data={}){
  fetch(url, { // first fetch info
    method: 'POST',
    mode: 'cors',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),
  })
  .then((res)=>{ //then if the 'res' is valid convert it into json()
    res.json()
    .then((jsonRes)=>{ //if the conversion was made successfully then update the UI
      updateUI(jsonRes.temp, jsonRes.date, jsonRes.feelings);
    },
    () =>{ // else if the conversion is not success then output error message
      console.log(`faild to convert response to json().`);
      alertError(`Error, see the console if you are a developer of contact for help.`);
    })
  },
  ()=>{ // if this then the data didn't post successfully
    console.log(`Error Posting data`);
    alertError(`Error, see the console if you are a developer of contact for help.`);
  });
}

// To update the information div
function updateUI(temp, date, feelings){
  show(output);
  // Empty search boxs
  feelingsContainer.value = zipCodeContainer.value = '';

  dateOutputContainer.innerText = date;
  tempOutputContainer.innerText = temp;
  feelingsOutputContainer.innerText = feelings;
  
}


/*
*
*  Helper functions
*
*/

// to get current date 
function getDate(){
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();

  newdate = year + "/" + month + "/" + day;
  return newdate;
}

// to warn clint with error
function alertError(error){
  output.innerText = `Error → ${error}`;
}

// function to show
function show(div){
  div.classList.add('show');
  div.classList.remove('hidden');  
}

// function to hide
function hide(div){
  div.classList.add('hidden');
  div.classList.remove('show');  
}