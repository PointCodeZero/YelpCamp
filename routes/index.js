var express      = require("express"),
    router       = express.Router(),
    passport     = require("passport"),
    User         = require("../models/user");

//ROOT Route - Landing Page
router.get("/", function(req, res){
   res.render("landing"); 
});


//show register form
router.get("/register", function(req, res) {
   res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
   var newUser = new User({ username: req.body.username }); 
   User.register(newUser, req.body.password, function(err, user){
       if (err) {
           req.flash("error", err.message); //you can pass the error message (comes from passport=local-mongoose) as a message - the err is an {}
           return res.redirect("/register");
       }
       passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome to YelpCamp " + user.username);
          res.redirect("/campgrounds"); 
       });
   }); 
});

//show login form
router.get("/login", function(req, res) {
   res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//LOGOUT Route
router.get("/logout", function(req, res) {
   req.logout(); //this method comes from the packages that we installed
   req.flash("success", "You have successfully logout!");
   res.redirect("/campgrounds");
});

module.exports = router;