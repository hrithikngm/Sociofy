const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {
    timestamps: true
})


const FriendsModel = mongoose.model('FriendsModel', friendsSchema);
module.exports = FriendsModel;