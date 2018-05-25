const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const samlRoute = require('./routes/saml');

const samlStrategy = require('./config/saml-strategy');

// setup view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect('mongodb://admin:admin@ds231720.mlab.com:31720/oauth-test', ()=> {
	console.log("Connected to MongoDB");
})

// body parser middleware
app.use(bodyParser.urlencoded({
	extended: true
}));

// logger middleware
function logger(req,res,next){
	console.log(req.method, req.url);
	next();
}
app.use(logger);

// create home route
app.get('/', (req,res)=> {
  res.render('home');
})

// map routes
app.use('/saml', samlRoute);

// spin up on 3000
app.listen(3001, ()=> {
  console.log("Express Server Started on Port 3001");
})
