const express = require("express");
const router = express.Router();
const path = require('path');

const postApiController = require('../../../controller/api/v1/postjson');

router.get("/", postApiController.postapi);

module.exports = router;