const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostModel'
    },

    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LikeModel'
    }]

});

var CommentModel = mongoose.model("CommentModel", commentSchema);
module.exports = CommentModel;