const express = require('express');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

const samlRoute = require('./routes/saml');

const samlStrategy = require('./config/saml-strategy');

// setup view engine
app.set('view engine', 'ejs');

/*
// connect to mongodb
mongoose.connect('mongodb://admin:admin@ds231720.mlab.com:31720/oauth-test', ()=> {
	console.log("Connected to MongoDB");
});*/

// setup cookie
app.use(cookieSession({
	maxAge:24*3600*1000,
	keys:['password']
}));

// initialize passport for cookie use
app.use(passport.initialize());
app.use(passport.session());

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
	// check is user is logged in
	if (req.user) {
		console.log("Auth: " + JSON.stringify(req.user));
	}else {
		console.log("Not Auth: " + JSON.stringify(req.user));
	}
  res.render('home');
});

// map routes
app.use('/saml', samlRoute);

// spin up on 3001
app.listen(3001, ()=> {
  console.log("Express Server Started On Port 3001");
})
