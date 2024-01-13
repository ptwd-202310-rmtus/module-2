

function bannedUser(req, res, next){
    if(req.session.currentUser.role ==="banned"){
        req.flash("errorMessage", "You cannot access content on this site.  Please contact system admin for more info")
        res.redirect("/login");
        return;
    } 
    next();
}


module.exports = bannedUser;