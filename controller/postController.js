const Post = require('../model/PostSchema');

module.exports.create = function(req, res) {
    console.log(req.body);
    Post.create({
        content: req.body.newpost,
        user: req.user.id
    }, function(err, newPost) {
        if (err) {
            console.log("Error in db");
            return;
        }
        console.log("****", newPost);
    })
    return res.redirect("back");
}

module.exports.delete = function(req, res) {

    Post.findByIdAndDelete(req.body.post_id, function(err) {

        if (err) console.log(err);

        console.log("Successful deletion");

        return res.redirect('back');
    })
}