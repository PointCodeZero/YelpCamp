var mongoose = require("mongoose");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: String, //storing the price as a String allows us to preserve the formatting
   description: String,
   author: {
      id: {
         type: mongoose.Schema.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
         }
      ]
});

module.exports = mongoose.model("Campground", campgroundSchema);