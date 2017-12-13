var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");


var data = [
    
        {
            name:           "Clouds Rest",
            image:          "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
            description:    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut massa ac metus iaculis bibendum nec eget est. Morbi imperdiet risus in sapien tempor sollicitudin. Nulla ultricies sed turpis id sodales. Morbi vel accumsan tellus. Donec sed sollicitudin mauris. Donec ut felis neque. Pellentesque eget tincidunt urna. Fusce euismod eleifend nibh, id ultrices justo consequat finibus. Sed sapien nibh, venenatis et tortor ut, aliquet euismod ex. Vestibulum ac nunc et diam consectetur dictum. Etiam id interdum libero. Ut fringilla lobortis lectus et dictum. Aenean ultricies rhoncus odio non laoreet. Quisque fermentum tellus id massa fermentum, nec ultrices eros viverra. Etiam risus risus, commodo eu efficitur non, imperdiet vel erat. "
        },
        {
            name:           "Stormy Park",
            image:          "https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
            description:    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut massa ac metus iaculis bibendum nec eget est. Morbi imperdiet risus in sapien tempor sollicitudin. Nulla ultricies sed turpis id sodales. Morbi vel accumsan tellus. Donec sed sollicitudin mauris. Donec ut felis neque. Pellentesque eget tincidunt urna. Fusce euismod eleifend nibh, id ultrices justo consequat finibus. Sed sapien nibh, venenatis et tortor ut, aliquet euismod ex. Vestibulum ac nunc et diam consectetur dictum. Etiam id interdum libero. Ut fringilla lobortis lectus et dictum. Aenean ultricies rhoncus odio non laoreet. Quisque fermentum tellus id massa fermentum, nec ultrices eros viverra. Etiam risus risus, commodo eu efficitur non, imperdiet vel erat. "
        },
        {
            name:           "Trees and Stuff",
            image:          "https://farm4.staticflickr.com/3211/3062207412_03acc28b80.jpg",
            description:    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut massa ac metus iaculis bibendum nec eget est. Morbi imperdiet risus in sapien tempor sollicitudin. Nulla ultricies sed turpis id sodales. Morbi vel accumsan tellus. Donec sed sollicitudin mauris. Donec ut felis neque. Pellentesque eget tincidunt urna. Fusce euismod eleifend nibh, id ultrices justo consequat finibus. Sed sapien nibh, venenatis et tortor ut, aliquet euismod ex. Vestibulum ac nunc et diam consectetur dictum. Etiam id interdum libero. Ut fringilla lobortis lectus et dictum. Aenean ultricies rhoncus odio non laoreet. Quisque fermentum tellus id massa fermentum, nec ultrices eros viverra. Etiam risus risus, commodo eu efficitur non, imperdiet vel erat. "
        }
    
];
    
    
    
    
function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds");
            
            //  add a few campgrounds
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