const express = require("express");
const router = express.Router();
const passport = require('passport');

const passport_local = require("../config/passport_local_storage");

const commentController = require('../controller/commentController');

router.post('/create', passport.checkAuthentication, commentController.create);
router.post("/delete", passport.checkAuthentication, commentController.delete);

module.exports = router;