var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campgrounds"),
    middleware = require("../middleware"); //we don't need to require ../middleware/index.js since index is a special file

//INDEX Route - show all campgrounds
router.get("/", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        err ? console.log(err) : res.render("campgrounds/index", { campgrounds: allcampgrounds });
    });
});


//CREATE Route - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){ //isLoggedIn is inside middleware obj
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    //relate and save this particular user with the new data he is inserting
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
       err ? console.log(err) : res.redirect("/campgrounds");
    });
});


//NEW Route - show form to create new campground 
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//SHOW Route - displays more information about campgrounds through an .../:
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err || !foundCampground) {
            console.log(err);
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground}); //foundCampground will return whatever we found with that id
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if (err || !foundCampground) {
            console.log(err);
        } else {
            res.render("campgrounds/edit", { campground: foundCampground }); 
        }
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           console.log(err);
           req.flash("error", "You don't have paermission to do that");
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "You've successfully deleted the campground");
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;