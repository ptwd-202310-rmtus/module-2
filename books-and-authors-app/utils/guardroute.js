

function guardRoute(req, res, next){
    if(!req.session.currentUser){
        res.redirect("/login");
        return;
    } 
    next();
}


module.exports = guardRoute;