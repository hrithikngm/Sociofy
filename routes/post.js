const express = require("express");
const router = express.Router();
const passport = require('passport');

const passport_local = require("../config/passport_local_storage");

const postController = require('../controller/postController');

router.post('/create', passport.checkAuthentication, postController.create);

module.exports = router;