const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentModel'
    }],
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LikeModel'
    }]


});

var PostModel = mongoose.model("PostModel", postSchema);
module.exports = PostModel;