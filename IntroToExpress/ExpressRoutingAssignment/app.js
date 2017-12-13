var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof",
        cat: "Meow"
    }
    
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
   
    res.send("The " + animal + " says '" + sound +"'");
});




app.get("/repeat/:message/:numTimes", function(req, res){
    var message = req.params.message;
    var numTimes = req.params.numTimes;
    var string = "";
    
    for(var i = 0; i < numTimes; i++) {
        string += message + " ";
    }
    
    res.send(string);
});


app.get("*", function(req, res){
    res.send("Sorry, page not found...What are you doing with your life?");
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER HAS STARTED");
});