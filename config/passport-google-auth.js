const passport = require('passport');
const crypto = require('crypto');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../model/SignUpSchema');
const keys = require('./datakeys');

passport.use(new GoogleStrategy({
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: "http://localhost:8080/user/auth/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        console.log(profile);

        User.findOne({ email: profile.emails[0].value },
            function(err, user) {
                if (err) {
                    console.log("Error in google auth");
                    return;
                }
                if (user)
                    return done(null, user);
                else {
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')

                    }, function(err, newContact) {
                        if (err) {
                            console.log("Error in db");
                            return;
                        }
                        console.log("****", newContact);
                        return;

                    })
                }

            })


    }))

module.exports = passport;