const express = require("express");
const router = express.Router();
const homeController = require("../controller/homeController");


console.log("you reached routes index page");


router.get('/', homeController.home);
router.use('/user', require('./users'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/like', require("./like"));
router.use('/api', require("./api"));
module.exports = router;