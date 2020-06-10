var Campground = require("../models/campground")
var Comment = require("../models/comment")
var middlewareObj = {}

middlewareObj.isAuthorised = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                req.flash("error", "Something went wrong")
                res.redirect("back")
            }
            else {
                if (campground.author.id.equals(req.user._id)) {
                    next()
                }
                else {
                    req.flash("error", "You dont have access to edit this")
                }
            }
        })
    }
    else {
        req.flash("danger", "You need to be loggeg In ")
        res.redirect("back")
    }
}



middlewareObj.commentAuthorised = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.c_id, function (err, comment) {
            if (err) {
                req.flash("Something went Wrong")
                res.redirect("back")
            }
            else {
                if (comment.author.id.equals(req.user._id)) {
                    next()
                }
                else {
                    req.flash("you cant edit this comment")
                }
            }
        })
    }
    else {
        req.flash("you should be logged in first")
        res.redirect("/campground/login")
    }
}




middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash("error", "You should be logged in first")
    res.redirect("/login")
}

module.exports = middlewareObj