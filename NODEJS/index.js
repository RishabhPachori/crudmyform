const express= require('express');
const bodyParser= require('body-parser');
const cors = require('cors');

const {mongoose}= require('./db.js');

var userController= require('./controller/userController.js');

//call express()
 var app= express();
 app.use(bodyParser.json());
 app.use(cors({ origin: 'http://localhost:4200' }));

 app.listen(3001,() => console.log("Server starting at port:3001"));

 app.use('/users',userController);