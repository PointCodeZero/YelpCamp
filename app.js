var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  Campground = require('./models/campgrounds'),
  Comment = require('./models/comment'),
  User = require('./models/user'),
  seedDB = require('./seeds'),
  PORT = 3000;

//Requiring Routes
var commentRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/yelp_camp_v13', {
  useNewUrlParser: true
});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(flash()); //use flash - needs to be put befor passport configuration
// seedDB();  //seed the database

//PASSPORT CONFIGURATION
app.use(
  require('express-session')({
    secret: 'Once again Rusty wins cutest dog!',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //User.authenticate method comes with passport-local-mongoose package, if not installed we would need to right down this method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ADD current user login / Sign up / logout / flassh messages on all of our pages
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

//This tells our app to use those 3 route files that we required
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes); //to short our routes path - will mean that all routes inside /routes/campgrounds.js will start with "/campgrounds"
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(PORT, function() {
  console.log('Yelp Camp Listening!');
});
