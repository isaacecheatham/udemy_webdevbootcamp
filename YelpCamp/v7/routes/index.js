var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")


//ROOT ROUTE
router.get("/", function(req, res){
     res.render("landing");
});



//==========AUTH ROUTES==============

router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    
    var newUser = User({username: req.body.username});
    
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render('register');
        }
        
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

//LOGIN ROUTES=========

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,(req, res) => {
    
});


//LOGOUT ROUTE==========

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});


//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


module.exports = router;