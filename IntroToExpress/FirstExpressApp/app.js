var express = require("express");
var app = express();

// "/" message that says hi

app.get("/", function(req, res) {
   res.send("Hi there!"); 
});

// "/bye" message that says googbye

app.get("/bye", function(req, res) {
   res.send("Goodbye!") ;
});
// "/dog" message that says meow

app.get("/dog", function(req, res) {
   res.send("MEOW!") ;
});

app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    
   res.send("WELCOME TO THE " +  subreddit.toUpperCase() + " SUBREDDIT!") ;
});






app.get("*", function(req, res) {
    res.send("You are a star");
});

//Tell express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS STARTED");
});