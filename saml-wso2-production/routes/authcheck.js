const router = require('express').Router();

router.get('/', (req,res)=>{
  if (req.isAuthenticated()) {
    res.send({isLoggedIn:true});
    //console.log("Current Authenticated User: " + JSON.stringify(req.user));
	}else {
    res.send({isLoggedIn:false});
    //console.log("Unauthenticated User");
	}
})

module.exports = router;

// NOW WORKING
