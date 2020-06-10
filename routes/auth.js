var express = require("express")
var router = express.Router()
var passport = require("passport")
var User = require("../models/user")

//HOME PAGE
router.get("/", function (req, res) {
  res.render("landing");
});


//REGISTER FORM
router.get("/register", function (req, res) {
  res.render("register")
})

//REGISTER NEW USER
router.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      req.flash("error", err.message)
      return res.render("register")
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "registered successfully as" + user.username)
      res.redirect("/campground")
    })
  })
})

//LOGIN FORM
router.get("/login", function (req, res) {
  res.render("login")
})

//LOGIN AUTHENTICATION
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campground",
  failureRedirect: "/login"
}), function (req, res) {
})

//LOGOUT ROUTE
router.get("/logout", function (req, res) {
  req.logout()
  req.flash("success", "Succesfully logged out")
  res.redirect("/campground")
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

module.exports = router
