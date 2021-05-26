const Comment = require('../model/CommentSchema');
const Post = require('../model/PostSchema');

module.exports.create = function(req, res) {
    // console.log(req.body);
    Post.findById(req.body.post, function(err, post) {
        if (post) {
            // console.log(post);
            Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                },
                function(err, comment) {
                    post.comment.push(comment);
                    post.save();
                    // console.log("***", comment);
                    res.redirect('back');
                }
            );
        }
    })

    // Post.find({}).populate('user').exec(function(err, posts) {
    //     if (err) {
    //         console.log("error");
    //         return;
    //     }

    //     return res.render('home', {
    //         post_list: posts
    //     });
    // })
}
module.exports.delete = async function(req, res) {

    try {
        let post_id;

        let comment = await Comment.findByIdAndDelete(req.body.comment_id);


        post_id = comment.post;

        let post = await Post.findById(post_id);

        // console.log(post);
        let idx = post.comment.indexOf(req.body.comment_id);
        // console.log(idx);

        post.comment.splice(idx, 1);
        post.save();

        // console.log("after updating");
        // console.log(post);


        // console.log("Comment Deleted");
        return res.redirect("back");

    } catch (err) {
        console.log("error in deleting comment", err);
    }


    // Comment.findByIdAndDelete(req.body.comment_id, function(err, comment) {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     post_id = comment.post;

    //     Post.findById(post_id, function(err, post) {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         // console.log(post);
    //         let idx = post.comment.indexOf(req.body.comment_id);
    //         // console.log(idx);

    //         post.comment.splice(idx, 1);
    //         post.save();
    //         // console.log("after updating");
    //         console.log(post);
    //     })

    //     console.log("Comment Deleted");
    // })
    // return res.redirect("back");
}