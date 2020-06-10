var express = require("express")
var route = express.Router({ mergeParams: true })
var Comment = require("../models/comment")
var Campground = require("../models/campground")
var middleware = require("../middleware")

//ADD NEW COMMENT FORM
route.get("/new", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err)
    }
    else {
      res.render("comments/new", { campground: campground })
    }
  })
})

//CREATE NEW COMMENT
route.post("/", middleware.isLoggedIn,
  function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        console.log(err)
      }
      else {
        Comment.create(req.body.comment, function (err, comment) {
          if (err) {
            console.log(err)
          }
          else {
            comment.author.id = req.user._id
            comment.author.username = req.user.username
            comment.save()

            campground.comments.push(comment)
            campground.save()
            res.redirect("/campground/" + req.params.id)
            console.log("comment has been pushed")
          }
        })
      }
    })
  })

//edit comment form
route.get("/:c_id/edit", middleware.commentAuthorised, function (req, res) {
  Comment.findById(req.params.c_id, function (err, comment) {
    if (err) {
      console.log(err)
    }
    else {
      res.render("comments/edit", { comment: comment, campground_id: req.params.id })
    }
  })
})


//update comment
route.put("/:c_id", middleware.commentAuthorised, function (req, res) {
  Comment.findByIdAndUpdate(req.params.c_id, req.body.comment, function (err) {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect("/campground/" + req.params.id)
    }
  })
})

//delete comment
route.delete("/:c_id", middleware.commentAuthorised, function (req, res) {
  Comment.findByIdAndRemove(req.params.c_id, function (err) {
    if (err) {
      res.redirect("/campground/" + req.params.id)
    }
    else {
      req.flash("success", "comment deleted")
      res.redirect("/campground/" + req.params.id)
    }
  })
})

module.exports = route