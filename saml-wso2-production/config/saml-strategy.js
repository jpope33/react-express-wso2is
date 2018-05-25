const passport = require('passport');
const SamlStrategy = require('passport-saml').Strategy;

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
    console.log(profile);
  })
)
