// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "books-and-authors-app";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.locals.blah = "hello world";

app.use((req, res, next)=>{
    app.locals.theUser = req.session.currentUser;
    app.locals.errorMessage = req.flash("errorMessage");
    app.locals.successMessage = req.flash("successMessage");
    next();
})


// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authorsRoutes = require("./routes/authors.routes");
app.use("/authors", authorsRoutes);
// /authors will now be prefixed to all the routes in the authors routes file

const booksRoutes = require("./routes/books.routes");
app.use("/books", booksRoutes);


const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
