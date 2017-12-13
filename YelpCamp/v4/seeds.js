var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");


var data = [
    
        {
            name:           "Clouds Rest",
            image:          "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
            description:    "blah blah blah"
        },
        {
            name:           "Stormy Park",
            image:          "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
            description:    "blah blah blah"
        },
        {
            name:           "Trees and Stuff",
            image:          "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
            description:    "blah blah blah"
        }
    
];
    
    
    
    
function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds");
            
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet!",
                                author: "Homer"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();  
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        }
    });
    
   
    
    
    //add a few comments
  
}

module.exports = seedDB;