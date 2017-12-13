var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/blog_demo_2', {useMongoClient: true});

var Post = require("./models/post");
var User = require("./models/user");


//Find User
//Find all posts for that user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });












Post.create({
    title: "How to cook the best burger pt. 4",
    content: "fgfgregtreejhkhjlhkjjl156487464564564876545644444444444444444444444444444444444444444khjlhjklkjh"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});









// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Bobber"
// });