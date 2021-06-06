const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        refpath: 'model'
    },
    model: {
        type: String,
        required: true,
        enum: ['PostModel', 'CommentModel']
    }
}, {
    timestamps: true
})

const LikeModel = mongoose.model('LikeModel', likeSchema);
module.exports = LikeModel;