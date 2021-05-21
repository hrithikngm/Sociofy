const express = require("express");
const router = express.Router();


const user_Controller = require("../controller/userController");

//console.log("hey there| you are on users page of routes ")

router.get('/user', user_Controller.user);

module.exports = router;