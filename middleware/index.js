var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comment");

//ALL MIDDLEWARE GOES HERE
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err || !foundCampground) {
                req.flash("error", "Campground not found");
                res.redirect("back"); //redirect to the previous page the user were
            } else {
                //if is logged in, does user own the campground? - find campground (req.params.id done above) -> check if the id of the author matches current user (req.user)
                    //don't compare the two below inside the if statement because they are different
                        //foundCampground.author.id = Object
                        //req.user._id = String
                    //Instead use a built-in method that comes wth mongoose => .equals()
                if (foundCampground.author.id.equals(req.user._id)) {
                    // we use next() as this will go on edit, update and destroy too
                        //res.render("campgrounds/edit", { campground: foundCampground });  
                    next();    
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged to do that");
        res.redirect("back"); 
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if (err || !foundComment) {
               console.log(err);
               req.flash("error", "Comment does not exist");
               res.redirect("back");
           } else {
               if (foundComment.author.id.equals(req.user._id)) {
                   next();
               } else {
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
   if (req.isAuthenticated()) {
       return next();
   }
   req.flash("error", "You need to be logged in to do that");
   res.redirect("/login");
};

module.exports = middlewareObj;



//3 WAYS OF DOING IT
//Objects
    // var middlewareObj = {
    //     checkCampgroundOwnership: function(){
            
    //     },
    //     checkCommentOwnership: function(){
            
    //     }
    // };
    
//Declaring
    // middlewareObj.checkCampgroundOwnership = function(){
        
    // };
    
    // middlewareObj.checkCommentOwnership = function(){
        
    // };
    
//Object Inside module.exports
    // module.exports = {
    //     checkCampgroundOwnership,
    // }