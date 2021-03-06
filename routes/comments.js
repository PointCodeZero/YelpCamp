var express    = require("express"),
    router     = express.Router({ mergeParams: true }), //mergeParams will bring our /:id so we'll not receive an error
    Campground = require("../models/campgrounds"),
    Comment    = require("../models/comment"),
    middleware = require("../middleware"); //we don't need to require ../middleware/index.js since index is a special file

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
       err ? console.log(err) : res.render("comments/new", {campground: campground});
   });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground) {
       if (err) {
         console.log(err);
         res.redirect("/campgrounds");
       } else {
           Comment.create(req.body.comment, function(err, comment){
              if (err) {
                  req.flash("error", "Something went wrong");
                  console.log(err);
              } else {
                  //add user name and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  console.log(comment);
                  req.flash("success", "Successfully added comment");
                  res.redirect("/campgrounds/" + campground._id);
              }
           });
       }
       
    });
});

//Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    //Handling errors to prevent our application to crash
    Campground.findById(req.params.id, function(err, foundCampground) {
       if (err || !foundCampground) {
           req.flash("error", "Campground not found");
           return res.redirect("back");
       }
       Comment.findById(req.params.comment_id, function(err, foundComment) {
           if (err || !foundComment) {
               console.log(err);
               req.flash("error", "Comment does not exist");
               res.redirect("back");
           } else {
               res.render("comments/edit", { campground_id: req.params.id, comment: foundComment }); //see comments on edit.ejs
           }
        });
    });
});

//Comments Update
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if (err) {
          res.redirect("back");
      } else {
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});

//Comments Destroy
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if (err) {
          res.redirect("back");
      } else {
          req.flash("success", "Comment deleted");
          res.redirect("/campgrounds/" + req.params.id);
      }
   }); 
});


module.exports = router;