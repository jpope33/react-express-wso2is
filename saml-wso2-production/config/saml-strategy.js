const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;
//const User = require('../model/wso2user');


passport.serializeUser((user,done)=> {
  done(null, user);
});

passport.deserializeUser((user,done)=> {
  done(null, user);
});

passport.use(
  new SamlStrategy({
    // strategy options
    issuer: 'WSO2app',

  	// login endpoints
  	entryPoint: 'https://localhost:9443/samlsso', // consumes SAML req, issues SAML res
  	callbackUrl: 'http://localhost:3001/saml/login/callback', // consumes SAML res

  	// logout endpoints
  	logoutUrl: 'https://localhost:9443/samlsso?slo=true',
  	logoutCallbackUrl: 'http://localhost:3001/saml/logout/callback',
  }, (profile, done)=> {
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

    done(null, user);


    /*
    // Store users in MongoDB
    new User({
      username: profile['http://wso2.org/claims/username'],
      email: profile.nameID,
      firstName: profile['http://wso2.org/claims/givenname'],
      lastName: profile['http://wso2.org/claims/lastname'],
      nameID: profile.nameID,
      nameIDFormat:profile.nameIDFormat
    }).save().then((newUser)=> {
      console.log("User Object: " + newUser);
    });*/

  })
)
