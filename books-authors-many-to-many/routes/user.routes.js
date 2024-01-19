const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');
const transporter = require("../config/nodemailer");
const guardRoute = require("../utils/guardroute");




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
            password: hashedPassword,
            role: "regular"
        })


        const info = await transporter.sendMail({
          from: "books-database@mail.com", // sender address
          to: email,
          subject: "Thank you for signing up", // Subject line
          text: "Thank you for signing up", // plain text body
          html: `<b>Thank you for signing up, ${username}</b>`, // html body
        });


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
        req.session.currentUser = {
          username: user.username,
           email: user.email,
            _id: user._id,
            role: user.role
          };
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


router.get("/forgot-password", (req, res, next)=>{
  res.render("users/forgot");
});


router.post("/reset-password", async (req, res, next)=>{
const theEmail = req.body.theEmail;

try{
  const theUser = await User.findOne({email: theEmail});
  if(!theUser){
    req.flash("errorMessage", "Email Not Found")
    res.redirect("/forgot-password");
    return;
  } else {
    let theNewPassword = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      theNewPassword += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(theNewPassword, salt)
    const theUpdate = await User.findByIdAndUpdate(
      theUser._id,
      {password: hashedPassword}
      );


    const info2 = await transporter.sendMail({
      from: "books-database@mail.com", // sender address
      to: theEmail,
      subject: "Password Reset", // Subject line
      text: "You Requested to reset your password", // plain text body
      html: `<b>You requested to reset your password</b> 
      <p>your temporary password is ${theNewPassword}</p>`, // html body
    });
    

    res.redirect("/login");
  }



} catch(err){
  next(err);
}





});




router.get("/update-pass", guardRoute, (req, res, next)=>{
  res.render("users/update-pass");
});



router.post("/update-pass", guardRoute, async (req, res, next)=>{
  const {newPass} = req.body;

  try{
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPass, salt)
    const theUpdate = await User.findByIdAndUpdate(
      req.session.currentUser._id,
      {password: hashedPassword}
      );

      res.redirect("/");


  } catch(err){
    next(err);
  }



});




module.exports = router;
