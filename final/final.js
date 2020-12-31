//Library
const express = require('express');
const mongoose = require ('mongoose');
const ProjectRouter = require('./routes/Project')
const app = express();
//const Data = require('../models/DataBase');

//to use mongodb'DataBase'
mongoose.connect('mongodb://localhost/blog',{
    useNewUrlParser: true,
    useUnifiedTopology :true
})


//to tell express to access the post method in project.js
app.use(express.urlencoded({extended: false}))
//___________________________________
//to use ejs not html
app.set('view engine' , 'ejs');


//to use photo and css files
app.use(express.static(__dirname + '/Public'));

app.get("/Select", isLoggedIn, function (req, res) {
    res.render("Select");
});


app.get('/Login',(req,res) => {
    res.render('Login');

})

app.post('/Login',async(req,res)=>{
const username=req.body.username;
const password=req.body.password;
res.render('Login')
})

//to use routers
app.use('/createacount',ProjectRouter);
app.use('/',ProjectRouter);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("Select");
}

app.listen(4000 ,function(){
    console.log("Started on part 4000 !")
});