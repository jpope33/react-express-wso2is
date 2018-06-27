const router = require('express').Router();

router.get('/', (req,res)=>{
  if (req.isAuthenticated()) {
    res.send({authStatus: 'Logged In'});
	}else {
    res.send({authStatus: 'Not Logged In'});
	}
  console.log("Current User: " + JSON.stringify(req.user));
})

module.exports = router;
