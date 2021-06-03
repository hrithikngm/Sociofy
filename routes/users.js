const express = require("express");
const router = express.Router();
const passport = require('passport');
// const localpassport = require('passport-local');
const passport_local = require("../config/passport_local_storage");
const user_Controller = require("../controller/userController");



//console.log("hey there| you are on users page of routes ")

router.get('/profile/:id', user_Controller.profile);
router.get('/', user_Controller.user);
router.get('/sign-up', user_Controller.signUp);
router.post('/create', user_Controller.create);
router.get('/sign-in', user_Controller.signIn);
// router.post('/createSession', user_Controller.createSession);

router.post('/createSession', passport.authenticate('local', { failureRedirect: '/user/sign-in' }), user_Controller.createSession);

router.get('/signout', user_Controller.signout);

router.post('/updateprofile', passport.checkAuthentication, user_Controller.update);



router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure'
    }), user_Controller.createSession);

module.exports = router;