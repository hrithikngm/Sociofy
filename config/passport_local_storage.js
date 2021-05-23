const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require("../model/UsersSignUpSchema");

//authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
}, (email, password, done) => {
    Users.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log("Error in Passport");
            return;
        }
        if (!user || user.password != password) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }
        return done(null, user);
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.checkAuthentication = function(req, res, next) {

    if (req.isAuthenticated()) {
        console.log("User authenticated");
        return next();
    }
    return res.redirect("/");
}

passport.setAuthenticate = function(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.export = passport;