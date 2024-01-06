const express = require('express');
const router = express.Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

/* GET home page */
router.get("/new", (req, res, next) => {
  Author.find()
  .then((allAuthors)=>{
      res.render("books/new", {allAuthors});
  })
  .catch((err)=>{
    next(err);
  })
});

router.post("/create", (req, res, next)=>{
    Book.create({
        title: req.body.theTitle,
        year: req.body.theYear,
        image: req.body.theImage,
        author: req.body.theAuthor
    })
    .then((result)=>{
        res.redirect("/books");
    })
    .catch((err)=>{
        next(err);
    })
})


router.get("/", (req, res, next)=>{
    Book.find()
    .then((theBooks)=>{
        res.render("books/index", {books: theBooks})
    })
    .catch((err)=>{
        next(err);
    })
})


router.get("/:id", (req, res, next)=>{
    Book.findById(req.params.id).populate("author")
    .then((theBook)=>{
        console.log(theBook);
        res.render("books/details", theBook)
    })
    .catch((err)=>{
        next(err);
    })
})


// router.get("/edit/:id", async (req, res, next)=>{
//     try{
//         const theBook = await Book.findById(req.params.id);
//         const allAuthors = await Author.find();
//         res.render("some-page-that-I-dont-have", {theBook, allAuthor})
//     } catch (err) {
//         next(err);
//     }
//   })

module.exports = router;
