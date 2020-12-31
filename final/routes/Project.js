const express = require('express');
const Data = require('../models/DataBase');
const router = express.Router();
const mongoose = require('mongoose');


router.use(express.static('Public'));
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})



//هاي اول صفحة عادي تبعت انه يدخل حسابه
router.get('/', (req,res)=>{

    res.render('createacount' ,{data :new Data()});
});

router.get('/DisCoverAPP', (req,res)=>{
    res.render('DisCoverAPP');
});

router.get('/FindFood', (req,res)=>{
    res.render('FindFood');
});

router.get('/:id', async(req,res)=>{
    const data = await Data.findById(req.params.id);
        res.render('Skills',{data:data})

    //res.render('FindFood');
});


router.post('/', async (req,res)=>{

    let data = new Data ({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    try{
         data = await data.save()
    db.collection('User').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
    });

        return res.redirect(`/createacount/${data.id}`)

    }catch(e){
        console.log(e);
        res.render('createacount' ,{data: data})

    }


});
router.post('/Select',(req,res)=>{
res.render('Select')
})
router.post('/FoodLove',(req,res)=>{
    res.render('FoodLove')
    })
    router.post('/result',(req,res)=>{
        res.render('result')
        })

module.exports = router;
