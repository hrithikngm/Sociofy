const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
});

var PostModel = mongoose.model("PostModel", postSchema);
module.exports = PostModel;