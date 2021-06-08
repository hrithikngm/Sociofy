const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/upload/user/avatar');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },

});


let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})

userSchema.statics.uploadAvatar = multer({ storage: storage }).single('avatar');
userSchema.statics.uploadpath = AVATAR_PATH;

var UserModel = mongoose.model('UserModel', userSchema);
module.exports = UserModel;