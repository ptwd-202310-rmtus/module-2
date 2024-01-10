const router = require("express").Router();
const bcryptjs = require("bcryptjs");

const User = require("../models/User.model.js");

// ****************************************************************************
// GET route to display signup form
router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

// ****************************************************************************
// POST route to save a new user in the database
// <form action="/create-account" method="POST">

module.exports = router;