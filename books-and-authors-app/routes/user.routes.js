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

        next(err);
    }
});


router.get("/login", (req, res, next)=>{
    res.render("users/login");
})


router.post("/login", (req, res, next)=>{
    const { email, password} = req.body;

    // if (email === '' || password === '') {
    //     res.render('auth/login', {
    //       errorMessage: 'Please enter both, email and password to login.'
    //     });
    //     return;
    //   }

    User.findOne({ email:email })
    .then(user => {
      if (!user) {
        // res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        res.redirect("/");
        return;
      } else if (bcryptjs.compareSync(password, user.password)) {
        req.session.currentUser = {username: user.username, email: user.email, _id: user._id};
        res.redirect("/books");
        // res.render('users/user-profile', { user:user });
      } else {
        res.redirect("/authors");
        // res.render('auth/login', { errorMessage: 'Incorrect password.' });
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
