const express = require('express');
const router = express.Router();
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const guardRoute = require("../utils/guardroute");
const bannedUser = require("../utils/banneduser");
const uploadThingy = require("../config/cloud");


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

router.post("/create", guardRoute, uploadThingy.single("theImage"), async (req, res, next)=>{
    try{
    
    const theBook = await Book.create({
        title: req.body.theTitle,
        year: req.body.theYear,
        image: req.file.path,
        authors: req.body.theAuthors,
        donor: req.session.currentUser._id});

        authorUpdate = await Author.updateMany(
            { _id: { $in: req.body.theAuthors } },
            { $push: { books : theBook} },
            {multi: true}
         )
    
        req.flash("successMessage", "Book successfully added to the database.  Thank you for your contribution");
        res.redirect("/books");
} catch(err){
    
    req.flash("errorMessage", "Sorry, something went wrong "+err);
    res.redirect("/books/new");
}
  
})


router.get("/", bannedUser, (req, res, next)=>{
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
    Book.findById(req.params.id).populate("authors").populate("donor")
    .then((theBook)=>{
        const deleteable = theBook.donor.equals(req.session.currentUser._id) || req.session.currentUser.role === "admin";
        res.render("books/details", {theBook, deleteable})
    })
    .catch((err)=>{
        next(err);
    })
});


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

    try{

        const book = await Book.findByIdAndDelete(req.params.id);
        const authorUpdate = await Author.updateMany(
            { _id: { $in: theBook.authors } },
            { $pull: { books : theBook._id} },
            {multi: true}
         )
        
         res.redirect("/books");
        
    } catch(err){
        next(err);
    }
  

})

module.exports = router;
