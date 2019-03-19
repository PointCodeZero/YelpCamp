# YelpCamp

YelpCamp is a Yelp clone with focus on sharing the best campgrounds you know!

A RESTful fullstack application built with front-end engines such as JavaScript, Bootstrap, CSS3, EJS and back-end engines like Node.js, Express, MongoDB, Mongoose. Authorization & Authentication is handled by Passport.js.

## Images

!["landing"](https://github.com/PointCodeZero/YelpCamp/blob/master/docs/landing.jpg)
!["main"](https://github.com/PointCodeZero/YelpCamp/blob/master/docs/main.jpg)
!["campground"](https://github.com/PointCodeZero/YelpCamp/blob/master/docs/campground.jpg)

## Dependencies

- [JavaScript](https://www.javascript.com/)
- [EJS](https://ejs.co/)
- [Passport.js](http://www.passportjs.org/)
- [connect-flash](https://github.com/jaredhanson/connect-flash)
- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## Functionality

- Users will can sign up or login with an existing account
- Users can add new campgrounds
- Users can create comments on any campground
- Users can edit or delete comments only if they are their owners
- Users can edit or delete a campground only if they are their owners

## Getting Started

1. Install all dependencies (run `npm install` command)
2. Run the Client server `./server.js` using the `npm start` command
3. Run the WebSocket server `./chatty_server/server.js` using the `node server.js` command

### Expected Usage

This program should be executed from the browser, in the following manner:

1. Go to your browser address bar and open `http://localhost/3000/`
2. Type a message and hit `Enter`
3. Type a new name and hit `Enter`
4. Open a new window browser and reapeat steps 2 and 3

#DELETING CAMPGROUNDS

- Add Destroy Route
- Add Delete Button

#AUTHORIZATION PART 1: CAMPGROUNDS

- User can only edit his/her campgrounds
- User can only delete his/her campgrounds
- Hide/Show edit and delete buttons

#EDITING COMMENTS

- Add Edit route for comments
- Add Edit button
- Add Update route

#DELETING COMMENTS

- Add Destroy Route
- Add Delete Button

#AUTHORIZATION PART 2: COMMENTS

- User can oly edit his/her comments
- User can only delete his/her comments
- Hide/Show edit and delete buttons
- Refactor Middleware

#ADDING IN FLASH

- Demo working version
- Install and configure connect-flash
- Setup flash on header.ejs file
- Add bootstrap alerts to header

#HANDLING ERRORS

- Prevent application to crash

#REFACTOR LANDING PAGE

- Add background animation

#DYNAMIC PRICE

- Add dynamic price to DB
