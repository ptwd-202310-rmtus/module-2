const express = require('express');
// this require line will always exist in some version for every npm package
// when you do a require without a relative path in it like ./ or ../
// then express assumed youre looking in node modules


const app = express();
// this instantiates the instance of express, were gonna call it app
// now the app object has a bunch of built in functions from express like .get and .listen



app.use(express.static('public'));
// the 'static' inside the parenthesese tells express wherte
// to search for static assets like images

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const mongoose = require("mongoose");
mongoose
  .connect('mongodb://localhost/cars-app')
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));




app.set("views", __dirname + "/views");
// ^ this line tells express where to find out views
app.set("view engine", "hbs");
// this line tells express were using hbs instead of html

app.get('/', (req, res, next) => {
    res.render("home");
});


const carRoutes = require("./routes/car-routes");
app.use("/", carRoutes);




app.listen(3000);