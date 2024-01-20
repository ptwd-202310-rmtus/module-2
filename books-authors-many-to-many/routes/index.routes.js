const express = require('express');
const router = express.Router();
const axios = require("axios");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// router.get("/lookuptime/:region/:place", (req, res, next)=>{
//   const {region, place} = req.params;
//   axios.get(`https://worldtimeapi.org/api/timezone/${region}/${place}`)
//   .then((theResponse)=>{
//     const theTime = new Date(theResponse.data.datetime);
//     const theTimeZone = theResponse.data.abbreviation;
//     const readable = theTime.toLocaleString('en-GB', { timeZone: theTimeZone })
//     res.render("currentTime", {currentTime: readable, place: place})
//   })
//   .catch((err)=>{
//     next(err);
//   }) 
// })

router.get("/lookuptime/:region/:place", (req, res, next)=>{
  const {region, place} = req.params;
  fetch(`https://worldtimeapi.org/api/timezone/${region}/${place}`)
  .then((theResponse)=>{
    return theResponse.json();
  })
  .then((newRes)=>{
    const theTime = new Date(newRes.datetime);
    const theTimeZone = newRes.abbreviation;
    const readable = theTime.toLocaleString('en-GB', { timeZone: theTimeZone })
    res.render("currentTime", {currentTime: readable, place: place})
  })
  .catch((err)=>{
    next(err);
  }) 
})



module.exports = router;
