var express = require("express")
var router = express.Router()
var Campground = require("../models/campground")
var middleware = require("../middleware")

//SHOW LIST OF CAMPGROUNDS
router.get("/", function (req, res) {
  Campground.find({}, function (err, newcampg) {
    if (err) {
      console.log(err)
    }
    else {
      res.render("campgrounds/campground", { campgrounds: newcampg });
    }
  })
});

//NEW  CAMPGROUND FORM
router.post("/", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var image = req.body.url;
  var price = req.body.price;
  var desc = req.body.description;
  var author = { id: req.user._id, username: req.user.username }
  var obj = { name: name, image: image, price: price, para: desc, author: author }
  Campground.create(
    obj, function (err, newlyCreated) {
      if (err) {
        console.log(err)
      }
      else {
        res.redirect("campground")
        console.log(newlyCreated)
      }
    }
  )
})

//Create NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new")
})

//Show A PARTICULAR CAMPGROUND
router.get("/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
    if (err) {
      console.log(err)
    }
    else {
      res.render("campgrounds/show", { details: foundCampground })
    }
  })
})

//edit route
router.get("/:id/edit", middleware.isAuthorised, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    res.render("campgrounds/edit", { campground: campground })
  })
})

//update route
router.put("/:id", middleware.isAuthorised, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err) {
    if (err) {
      console.log(err)
      res.redirect("/campground")
    }
    else {
      res.redirect("/campground/" + req.params.id)
    }
  })
})

//delete route
router.delete("/:id", middleware.isAuthorised, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campground")
    }
    else {
      res.redirect("/campground")
    }
  })
})

module.exports = router