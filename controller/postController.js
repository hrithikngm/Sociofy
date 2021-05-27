const Post = require('../model/PostSchema');
const Comment = require("../model/CommentSchema");
module.exports.create = async function(req, res) {
    console.log(req.body);
    try {
        let post = await Post.create({
            content: req.body.newpost,
            user: req.user.id
        });
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post Created"
            })
        }
        return res.redirect("back");
    } catch (err) {
        console.log(err);
        return;
    }

}

module.exports.delete = function(req, res) {

    Post.findByIdAndDelete(req.body.post_id, function(err) {


        if (err) console.log(err);

        Comment.deleteMany({ post: req.body.post_id }).then(function() {
            console.log("Data deleted"); // Success
        }).catch(function(error) {
            console.log(error); // Failure
        });

        // console.log("Successful deletion");

        return res.redirect('back');
    })
}