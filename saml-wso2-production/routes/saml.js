const router = require('express').Router();
const passport = require('passport');

router.get('/login',
	passport.authenticate('saml', {
		successRedirect: '/',
		failureRedirect: '/login'
	})
);

router.post('/login/callback',
	passport.authenticate('saml', {
	failureRedirect: '/login',
	failureFlash: true,
	}),
	function(req, res){
		res.redirect('/')
	}
);

router.get('/logout', (req,res)=> {
	req.logout();
	res.redirect('/');
});

module.exports = router;
