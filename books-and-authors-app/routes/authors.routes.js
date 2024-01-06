const express = require('express');
const router = express.Router();
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");

/* GET home page */
// this route is actually /authors because we pre fixed all the routes in this file
router.get("/", (req, res, next) => {
  Author.find()
  .then((allAuthors)=>{
    res.render("authors/index", {authors: allAuthors});
  })
  .catch((err)=>{
    next(err);
  })
});



  router.get("/new", (req, res, next)=>{
    res.render("authors/new");
  });

  router.post("/create", (req, res, next)=>{
    Author.create({
        name: req.body.name,
        hometown: req.body.hometown,
        birthdate: req.body.birthdate, 
        image: req.body.image
        })
    .then((result)=>{
        res.redirect("/authors");
    })
    .catch((err)=>{
        next(err);
    })

  })


  router.get("/:theID", async (req, res, next) => {
    try{
      let theAuthor = await Author.findById(req.params.theID);
      let theBooks = await Book.find({author: req.params.theID})
      res.render("authors/details", {theAuthor, theBooks});
    } catch (err){
      next(err);
    }
  });


  router.post("/delete/:theID", (req, res, next)=>{
    Author.findByIdAndDelete(req.params.theID)
    .then(()=>{
        res.redirect("/authors")
    })
    .catch((err)=>{
        next(err);
    })
  });



  router.get("/edit/:id", (req, res, next)=>{
    Author.findById(req.params.id)
    .then((theAuthor)=>{
        res.render("authors/edit", theAuthor);
    })
    .catch((err)=>{
        next(err);
    })
  })


  router.post("/update/:id", (req, res, next)=>{
    const {theName, theBirthdate, theHometown, theImage} = req.body;
    Author.findByIdAndUpdate(req.params.id, {
        name: theName,
        birthdate: theBirthdate,
        hometown: theHometown,
        image: theImage
    })
    .then((result)=>{
        res.redirect("/authors/"+req.params.id)
    })
    .catch((err)=>{
        next(err);
    })
    
  })





module.exports = router;
