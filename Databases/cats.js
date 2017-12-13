var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
mongoose.Promise = global.Promise;

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});


var Cat = mongoose.model("Cat", catSchema);


// var george = new Cat({
//     name: "George",
//     age: 11,
//     temperament: "Grouchy"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("SOMETHING WENT WRONG")
//     } else {
//         console.log("WE JUST SAVED A CAT TO THE DATABASE: ")
//         console.log(cat);
//     }
// });

Cat.create({
   name: "Franks",
   age: 5,
   temperament: "Sweet"
}, function(err, cat){
      if(err){
        console.log("SOMETHING WENT WRONG");
        console.log(err);
    } else {
        console.log("TEST............................")
        console.log(cat);
    }
});


Cat.find({}, function(err, cats){
      if(err){
        console.log("SOMETHING WENT WRONG");
        console.log(err);
    } else {
        console.log("All the cats.....")
        console.log(cats);
    }
});