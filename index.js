var express = require("express");
var app = express();
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var flash = require("connect-flash")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var methodOverride = require("method-override")
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var User = require("./models/user")
var seedDB = require("./seeds")

var commentRoutes = require("./routes/comments"),
  campgroundRoute = require("./routes/campgrounds"),
  authRoute = require("./routes/auth")



mongoose.connect('mongodb://localhost:27017/yelpcamp', { useNewUrlParser: true, useUnifiedTopology: true })
app.use(bodyParser.urlencoded(
  { extended: true }
))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))
// seedDB()


//configure passport
app.use(require("express-session")({
  secret: "I am learning web devlopment now a days",
  resave: false,
  saveUninitialized: false
}))

app.use(methodOverride("_method"))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function (req, res, next) {
  res.locals.currentUser = req.user
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  next()
})

app.use("/campground/:id/comments", commentRoutes)
app.use("/campground", campgroundRoute)
app.use(authRoute)

adrs = process.env.PORT || 1000


app.listen(adrs, process.env.IP, function () {
  console.log("yelp camp server has started");
});
