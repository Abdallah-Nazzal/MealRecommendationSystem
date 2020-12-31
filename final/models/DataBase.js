const mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/newdb";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true

    },

    username:{
        type: String,
        unique : true

    },
    password:{
        type:String,
        unique:true
    }
})

/*MongoClient.connect(url,
    function(err, db) {
    if (err) throw err;
    console.log("Database connected!");
    var dbo = db.db("newdb");
    var docs =[
    { name:"German Pancake with Buttermilk Sauce",id:0 },
    { name:"Pumpkin Pancakes",id:1 },
    { name:"Oatmeal Pancakes",id:2},
    { name:"Vegan Pancakes",id:3},
    { name:"Grandad'Pancakes",id:4},
    { name:"Blueberry Flax Pancakes",id:5},
    { name:"Herman Pancakes",id:6},
    { name:"Oven Pancakes",id:7},
    { name:"Beer Pancakes",id:8},
    { name:"Fluffy Pancakes",id:9},
    { name:"Nuteela Pancakes",id:10},
    { name:"Banana Pancakes",id:11}];

    dbo.collection("User").insertMany(docs, function(err, res) {
        if (err) throw err;
        console.log("many document inserted");
        var results = dbo.collection("User").find({id:0});
        results.forEach(row => {
            console.log(row);
        });
    });
});*/

module.exports = mongoose.model('Data', UserSchema )