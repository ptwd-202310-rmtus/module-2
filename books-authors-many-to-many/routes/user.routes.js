const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');


router.get("/signup", (req, res, next) => {
    res.render("users/signup");
});


router.post("/signup", async (req, res, next)=>{
    const saltRounds = 10;
    const { username, email, password } = req.body;
    try{
        const salt = await bcryptjs.genSalt(saltRounds);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })

        res.redirect("/");
    } catch(err) {
      req.flash("errorMessage", err)
        next(err);
    }
});


router.get("/login", (req, res, next)=>{
    res.render("users/login");
});


router.post("/login", (req, res, next)=>{
    const {email, password} = req.body;

    if (email === '' || password === '') {
      // this one is redundant because we have frontend validation preventing this 
      // but it is stll best practice to have redundant security on multiple levels
      req.flash("errorMessage", "Password and email cannot be blank");
      res.redirect('/login');
        return;
      }

      if (password.length < 5) {
        // this is how you manually put a custom error message
        req.flash("errorMessage", "Sorry password must be at least 5 characters");
        res.redirect('/login');
        return;
      }



    User.findOne({ email:email })
    .then(user => {
      if (!user) {
        req.flash("errorMessage", "User not found");
        res.redirect("/login");
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = {username: user.username, email: user.email, _id: user._id};
        req.flash("successMessage", "Sucessfully Logged in")
        res.redirect("/");
      } else {
        req.flash("errorMessage", "Email password combination not found")
        res.redirect("/login");
      }
    })
    .catch(error => next(error));
});


router.post("/logout", (req, res, next)=>{
  req.session.destroy(err => {
    if (err) next(err);
    res.redirect('/');
  });
})









module.exports = router;
