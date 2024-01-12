const express = require('express');
const router = express.Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const guardRoute = require("../utils/guardroute");


/* GET home page */
router.get("/new", guardRoute, (req, res, next) => {
  
  Author.find()
  .then((allAuthors)=>{
      res.render("books/new", {allAuthors});
  })
  .catch((err)=>{
    next(err);
  })
});

router.post("/create", guardRoute, (req, res, next)=>{
    Book.create({
        title: req.body.theTitle,
        year: req.body.theYear,
        image: req.body.theImage,
        author: req.body.theAuthor,
        donor: req.session.currentUser._id,
    })
    .then((result)=>{
        res.redirect("/books");
    })
    .catch((err)=>{
        next(err);
    })
})


router.get("/", (req, res, next)=>{
    console.log(req.session);
    Book.find()
    .then((theBooks)=>{
        res.render("books/index", {books: theBooks})
    })
    .catch((err)=>{
        next(err);
    })
})


router.get("/:id", (req, res, next)=>{
    Book.findById(req.params.id).populate("author").populate("donor")
    .then((theBook)=>{
        const selfOwned = theBook.donor.equals(req.session.currentUser._id)
        
        res.render("books/details", {theBook, selfOwned})
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


router.post("/:id/delete", guardRoute, async (req, res, next)=>{
   

    const theBook = await Book.findById(req.params.id)
    
    if(!theBook.donor.equals(req.session.currentUser._id)){
        res.redirect("/");
        return;
    }


    Book.findByIdAndDelete(req.params.id)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        next(err);
    })

})

module.exports = router;
