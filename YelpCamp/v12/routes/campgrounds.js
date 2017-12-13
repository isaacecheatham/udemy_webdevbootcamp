var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();
var middleware = require("../middleware");

//INDEX
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allcampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
        }
    });
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author:author};
    //Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds
            console.log(newlyCreated);
            res.redirect("/campgrounds"); 
        }
    });
});

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
     res.render("campgrounds/new");
});


//SHOW - shows more infor about one campground
router.get("/:id", function(req, res) {
    //find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash('error', 'Campground not found');
            res.redirect('back');
        } else {
             //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});



//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});


//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    //Find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id)   ;
        }
    });
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
   Campground.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});



module.exports = router;