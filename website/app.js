/* Global Variables */

const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");
const dateTime = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const zipCode = document.getElementById("zip");
const apiUrl = `http://localhost:3000/`;
const apiKey = `&appid=9dbef4e13172f37be2f232274902bdf9`;
const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;

const errorCatch = (error) => console.error(`some error in here${error}`)
// Event listener to add function to existing HTML DOM element
// Function called by event listener Made with Arrow function ````**Update to arrow function**````
document.getElementById('generate').addEventListener('click',() => {
  let data = {
    zipCode: zipCode.value,
    content: feelings.value,
    date: new Date()
}
/* Function to GET Web API Data*/
getZipCodeInformation(data.zipCode).then(zipInfo => {
  
    console.log(zipInfo)
    data.temp = zipInfo.main.temp;
    /* Function to POST data Using data var */
    postDateToServer(data);
}).catch(errorCatch);
})




/* Function to GET Web API Data*/
async function getZipCodeInformation(zipCode) {
  return await (await fetch(baseURL+zipCode+apiKey)).json();
}

  /* Function to POST data Using data  */
async function postDateToServer(data) {
  let response = await fetch(`${apiUrl}postInf`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
  });
  try {
      if (!response.ok) {
          alert(`can't be done`);
          return;
      }
     
      response.json().then(data => {
          if (response.ok)
              updateUI();//Update UI Function
          else
              alert(`can't be done`);
      }).catch(errorCatch);

  } catch (error) {
      errorCatch(error);
  }
}

/** Update UI Function */
async function updateUI() {
  let response = await fetch(`${apiUrl}getInf`);
  try {
      response.json().then(data => {
          dateTime.innerHTML = `Date Is: ${data.date}`;
          temp.innerHTML = `Temp Is: ${data.temp}`;
          content.innerHTML = `My Feelings Is: ${data.content}`;
      }).catch(errorCatch);
  } catch (error) {
      catchError(error);
  }
}
