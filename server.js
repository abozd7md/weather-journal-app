// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express = require('express')
const app = express()
const port = 3000;
const cors = require('cors')


// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json()); // body-parser -updated
app.use(express.urlencoded({ extended: false }));  // body-parser -updated


//get method
app.get('/getInf', (req, res) =>{
    res.send(projectData).status(200).end()
})
    //post method
app.post('/postInf',(req, res) => {

    projectData = {
        temp:req.body.temp,
        date:req.body.date,
        content:req.body.content
    }
    res.send(projectData).status(200).end()
})
// Setup Server
app.listen(port , () => {console.log(`welocome on ${port}`)})