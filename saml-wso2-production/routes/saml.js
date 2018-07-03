const router = require('express').Router();
const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
const fs = require('fs');
const User = require('../model/wso2user');

passport.serializeUser((user,done)=> {
  done(null, user);
});

passport.deserializeUser((user,done)=> {
  done(null, user);
});

const samlStrategy = new SamlStrategy({

  // strategy options
  issuer: 'WSO2app',

  // login endpoints
  entryPoint: 'https://localhost:9443/samlsso', // consumes SAML req, issues SAML res
  callbackUrl: 'http://localhost:3001/saml/login/callback', // consumes SAML res

  // logout endpoints
  logoutUrl: 'https://localhost:9443/samlsso?slo=true',
  logoutCallbackUrl: 'http://localhost:3001/saml/logout/callback',

  signatureAlgorithm: 'sha256',

  // public cert .pem format, removed --HEADER-- and --FOOTER--
	//cert: fs.readFileSync('/home/jonathan/Desktop/NewKeyStuff/serverCertTwo.pem', 'utf-8'),
  // private cert .pem format
  //privateCert: fs.readFileSync('/home/jonathan/Desktop/NewKeyStuff/clientKeyDecryptTwo.pem', 'utf-8')


}, (profile, done)=> {
  /*
  // Create user and serialize entire user object
  user = {
    username: profile['http://wso2.org/claims/username'],
    email: profile.nameID,
    firstName: profile['http://wso2.org/claims/givenname'],
    lastName: profile['http://wso2.org/claims/lastname'],
    nameID: profile.nameID,
    nameIDFormat:profile.nameIDFormat
  };
  console.log("User Object: " + JSON.stringify(user));
  return done(null, user);
  */

  // Store users in MongoDB
  new User({
    username: profile['http://wso2.org/claims/username'],
    email: profile.nameID,
    firstName: profile['http://wso2.org/claims/givenname'],
    lastName: profile['http://wso2.org/claims/lastname'],
    nameID: profile.nameID,
    nameIDFormat:profile.nameIDFormat
  }).save().then((user)=> {
    console.log("MongoDB User object: " + user);
    return done(null, user);
  });
});

passport.use(samlStrategy);

router.get('/login',
	passport.authenticate('saml', {
		successRedirect: 'http://localhost:3000',
		failureRedirect: '/login'
	})
);

router.post('/login/callback',
	passport.authenticate('saml', {
	failureRedirect: '/login',
	failureFlash: true,
	}),
	function(req, res){
		res.redirect('http://localhost:3000')
	}
);

router.get('/logout', (req,res)=> {

  // look up user in mongo and drop

  samlStrategy.logout(req, (err, request)=> {
    if (!err) {
      //local logout
      req.logout();
      //IdP logout
      //console.log(request);
      res.redirect(request);
    }
  });
})

module.exports = router;
