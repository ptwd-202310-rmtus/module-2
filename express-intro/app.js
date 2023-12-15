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

// this is called a route. it is a get route
// get routes do not change anything in any database, theyre more like a read-only route
// post routes change things in databases generally, and are encrypted for security
app.get('/', (req, res, next) => {
    // app.get takes 2 argument, the first argument is the route,
    // in this case "/" means just the home page, so if we had a site at 
    // www.coolpage.com, this route would be www.coolpage.com/ which is the home page
    res.sendFile(__dirname + '/viewss/home.html');
});


app.get('/blahh', (req, res, next)=>{
    res.sendFile(__dirname + '/viewss/blah.html');
});


app.listen(4000);
// .listen tells your app to open a port on your computer to run as a local fake internet port


