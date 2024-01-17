const express = require('express');
const router = express.Router();
const Author = require("../models/Author.model");
const Book = require("../models/Book.model");
const uploadThingy = require("../config/cloud");

/* GET home page */
// this route is actually /authors because we pre fixed all the routes in this file
router.get("/", (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect("/login");
  }
  Author.find()
  .then((allAuthors)=>{
    res.render("authors/index", {authors: allAuthors});
  })
  .catch((err)=>{
    next(err);
  })
});



  router.get("/new", (req, res, next)=>{
    if(!req.session.currentUser){
      res.redirect("/login");
    }
    res.render("authors/new");
  });

  router.post("/create", uploadThingy.single("image"), (req, res, next)=>{
    Author.create({
        name: req.body.name,
        hometown: req.body.hometown,
        birthdate: req.body.birthdate, 
        image: req.file.path
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
      let theAuthor = await Author.findById(req.params.theID).populate("books");
      res.render("authors/details", {theAuthor});
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
      console.log(theAuthor);
        res.render("authors/edit", theAuthor);
    })
    .catch((err)=>{
        next(err);
    })
  })


  router.post("/update/:id", uploadThingy.single("theImage"), (req, res, next)=>{
    const {theName, theBirthdate, theHometown} = req.body;

    let theUpdate = {
      name: theName,
      birthdate: theBirthdate,
      hometown: theHometown,
    }
    if(req.file){
      theUpdate.image = req.file.path
    }
    
    Author.findByIdAndUpdate(req.params.id, theUpdate)
    .then((result)=>{
        res.redirect("/authors/"+req.params.id)
    })
    .catch((err)=>{
        next(err);
    })
    
  })





module.exports = router;
