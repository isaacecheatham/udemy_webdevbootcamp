var express = require("express");
var Campground = require("../models/campground");
var router = express.Router();

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
router.post("/", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
           //redirect back to campgrounds
    res.redirect("/campgrounds"); 
        }
    });
});

//NEW
router.get("/new", function(req, res) {
     res.render("campgrounds/new");
});


//SHOW - shows more infor about one campground
router.get("/:id", function(req, res) {
    //find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
             //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


module.exports = router;