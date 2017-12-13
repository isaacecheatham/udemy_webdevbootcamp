var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campground              = require("./models/campground"),
    Comment                 = require("./models/comment"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    =require("./models/user"),
    seedDB                  = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v6");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "My Secret Password",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MAKE AVAILABLE EVERYWHERE
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});




//=================ROUTES==================

app.get("/", function(req, res){
     res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req, res){
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
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res) {
     res.render("campgrounds/new");
});


//SHOW - shows more infor about one campground
app.get("/campgrounds/:id", function(req, res) {
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



//==========================================================
//===================COMMENTS ROUTES========================
//==========================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    //find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if(err) {
            console.log(err);
        } else {
              res.render("comments/new", {campground: campground}); 
        }
    });
});


app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
    //lookup campground by id
    Campground.findById(req.params.id, (err, campground) =>  {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
})



//==========AUTH ROUTES==============

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    
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

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,(req, res) => {
    
});


//LOGOUT ROUTE==========

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});



function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELPCAMP SERVER HAS STARTED");
});