const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get('/cars', (req, res, next) => {
    Car.find()
    .then((result)=>{
        console.log(result);
        res.render("cars/allcars", {cars: result});
    })
    .catch((err)=>{
        console.log(err);
    })
});


router.get("/cars/:theID", (req, res, next)=>{
    Car.findById(req.params.theID)
    .then((result)=>{
        res.render("cars/car-details", {theCar:result})
    })
    .catch((err)=>{
        console.log(err);
    })
    
})


router.get("/new-car", (req, res, next)=>{
    res.render("cars/newcar");
});



router.post("/create-car", (req, res, next)=>{
    const {company, model, theBodyType, imgUrl} = req.body;
    Car.create({
        company:company,
        model:model,
        bodyType: theBodyType,
        picture: imgUrl
    }).then((result)=>{
        res.redirect("/cars")
    })
    .catch((err)=>{
        console.log(err);
    })
});




module.exports = router;