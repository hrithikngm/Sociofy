const express = require("express");
const router = express.Router();
const passport = require('passport');

const likeController = require('../controller/likeController');

router.get('/toggle/:id/:type', likeController.toggle)

module.exports = router;