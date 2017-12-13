var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");


 var campgrounds = [
            {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
            {name: "Granite Hill", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
            {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
            {name: "Granite Hill", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
            {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
            {name: "Granite Hill", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"},
            {name: "Salmon Creek", image: "https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg"},
            {name: "Granite Hill", image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg"},
            {name: "Mountain Goat's Rest", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg"}
    ]
    

app.get("/", function(req, res){
     res.render("landing");
});


app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});


app.get("/campgrounds/new", function(req, res) {
     res.render("new");
});



app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds
    res.redirect("/campgrounds");
    
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELPCMAP SERVER HAS STARTED");
});