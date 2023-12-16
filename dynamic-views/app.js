const express = require('express');
// this require line will always exist in some version for every npm package
// when you do a require without a relative path in it like ./ or ../
// then express assumed youre looking in node modules
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();




const app = express();
// this instantiates the instance of express, were gonna call it app
// now the app object has a bunch of built in functions from express like .get and .listen



app.use(express.static('public'));
// the 'static' inside the parenthesese tells express wherte
// to search for static assets like images




app.set("views", __dirname + "/viewss");
// ^ this line tells express where to find out views
app.set("view engine", "hbs");
// this line tells express were using hbs instead of html



app.get('/', (req, res, next) => {
    res.render("home");
});


app.get('/blahh', (req, res, next)=>{
    res.render("blah");
});


app.get("/blahh/:whatever", (req, res, next)=>{
    // what this :whatever means is that this route is not 
    // /blahh/whatever, its /blah/<anything>
    // so /blahh/5 will take you here 
    // /blahh/hello will also take you here
    // :whatever is a url parameter which is like a variable
    // in the url
    // now i have a variable called req.params.whatever
    // and its equal to whatever actual value is in the url
    // so if we go to /blahh/5 then req.params.whatever == 5
    // if we go to /blahh/hello then req.params.whatever == "hello"
    res.send(req.params);
});


// this is our fake database
const catsDB = [
    {name: "Fluffy", id: 1, favoriteFood: "tuna", weight: 19, image: "/images/cat1.jpeg", indoor: true},
    {name: "Margo", id: 2, favoriteFood: "cat food", weight: 13, image: "/images/cat2.jpeg", indoor: true},
    {name: "Nosey", id: 3, favoriteFood: "cheese", weight: 22, image: "/images/cat3.jpg", indoor: false},
    {name: "Pierre", id: 4, favoriteFood: "rice and beans", weight: 14, image: "/images/cat4.jpeg", indoor: false},
    {name: "Figaro", id: 5, favoriteFood: "chicken", weight: 18, image: "/images/cat5.jpeg", indoor: true},
    {name: "Storm", id: 6, favoriteFood: "turkey", weight: 12, image: "/images/cat6.jpeg", indoor: true}
];
// ---------------------------



app.get("/cats", (req, res, next)=>{

    catsWithStatus = catsDB.map((eachCat)=>{
        let theCat = {...eachCat};
        if(eachCat.weight >= 15){
            theCat.fatCat = true;
        }
        return theCat;
    })


// you dont need to link to /viewss/cats.hbs 
// instead you just link to cats
// because the app already knows were using hbs
// and it already knows where the views are located\
// from lines 16 & 18
// the first argument is the hbs file you want to show
    res.render("catss", {allTheCats: catsWithStatus});
    // the second argument for res.render must be an object
    // you can pass in as many variables as you want here
    // each key-value pair will be a variable that is accessible in the hbs file

})


app.get("/cats/:theID", (req, res, next) => {



    const theCat = catsDB.find((cat)=>{
        return cat.id == req.params.theID;
    });

    if(!theCat) res.redirect("/cats");


    res.render("catDetails", theCat);
    // because theCat is an object, ^ this is the same as doing this
    // {name: "nosey", id: 3, weight: 15, etc.}

});


app.get("/randomBeer", (req, res, next)=>{
    punkAPI.getRandom()
    .then((responseFromAPI)=>{
        res.render("beer", {theBeer: responseFromAPI[0]});
    })
})





app.listen(4200);
// .listen tells your app to open a port on your computer to run as a local fake internet port


