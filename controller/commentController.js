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