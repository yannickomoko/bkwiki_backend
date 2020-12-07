const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors'); 

const routePost = require('./routes/postData');


const port = 5000;
const app = express(); 

app.use( bodyparser.json() );   
app.use(bodyparser.urlencoded({   
extended: true
}));

// access control allow origin handles
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Import Routes
app.use('/users', routePost);

 
app.listen(port, () => console.log(`Server starting in port ${port}!`));