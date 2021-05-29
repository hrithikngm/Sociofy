const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require("../model/SignUpSchema");

//authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    Users.findOne({ email: email }, (err, user) => {
        if (err) {
            req.flash("error", "Invalid email/password");
            return;
        }
        if (!user || user.password != password) {
            req.flash("error", "Invalid email/password");
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
        // console.log("User authenticated");
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

module.exports = passport;