var express = require('express');
var router = express.Router();
var userModel= require("./users");
const passport = require('passport');
const localStrategy= require("passport-local")

passport.use(new localStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/loggedin', isLoggedIn, function(req, res, next) {
  userModel.findOne({
    username:req.session.passport.user,
  }).then(function(user){
    res.render("loggedin",{user})
    // console.log(user)
  }).catch(function(err){
    res.send(err)
  })
});

router.post("/register",function(req,res,next){
  var newUser = new userModel({
    username : req.body.username
  })
  userModel.register(newUser, req.body.password)
  .then(function(u){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/loggedin")
    })
    })
  .catch(function(e){
    res.send(e)
  })
})

router.get("/login",passport.authenticate("local",{
  successRedirect:"/loggedin",
  failureRedirect:"/"
}))

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.send('Logout ')
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.redirect("/");
  }
}


module.exports = router;
