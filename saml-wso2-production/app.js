const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

// define route(s)
const samlRoute = require('./routes/saml');

// setup view engine
app.set('view engine', 'ejs');

// connect to mongodb
mongoose.connect('mongodb://admin:admin@ds231720.mlab.com:31720/oauth-test', ()=> {
	console.log("Connected to MongoDB");
});

// setup cookie, required for SLO
app.use(cookieSession({
	maxAge:24*3600*1000,
	keys:['password']
}));

/* THIS DOESN'T SEEM NECESSARY?
// initialize passport for cookie use
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));*/
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
	if (req.isAuthenticated()) {
		console.log("AUTHENTICATED: " + JSON.stringify(req.user));
	}else {
		console.log("NOT AUTHENTICATED: " + JSON.stringify(req.user));
	}
  res.render('home');
});

// map routes
app.use('/saml', samlRoute);

// spin up on 3001
app.listen(3001, ()=> {
  console.log("Express Server Started On Port 3001");
})
