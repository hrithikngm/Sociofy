const Post = require('../model/PostSchema');

module.exports.create = function(req, res) {
    console.log(req.body);
    Post.create({
        content: req.body.newpost,
        user: req.user._id
    }, function(err, newPost) {
        if (err) {
            console.log("Error in db");
            return;
        }
        console.log("****", newPost);
    })
    return res.redirect("back");
}