const Like = require('../model/LikeSchema');
const Post = require('../model/PostSchema');
const Comment = require('../model/CommentSchema')

module.exports.toggle = async function(req, res) {
    try {
        let likeable;

        if (req.params.type == 'PostModel') {
            likeable = await Post.findById(req.params.id).populate('like');
        } else {
            likeable = await Comment.findById(req.params.id).populate('like');
        }

        // console.log("helllllll");
        // console.log(likeable);

        // ab dekho ki like already exists or notDeepEqual
        // if already exists then pull otherwise push
        let exist = await Like.findOne({
            likeable: likeable.id,
            user: req.user.id,
            model: req.params.type
        })
        console.log(exist);

        if (exist) {
            //like delete pull krna h
            if (req.params.type == 'PostModel') {
                let post = await Post.findById(req.params.id);

                let idx = post.like.indexOf(exist.id);
                post.like.splice(idx, 1);

                post.save();

            } else {
                let comment = await Comment.findById(req.params.id)
                let idx = comment.like.indexOf(exist.id);
                comment.like.splice(idx, 1);
                comment.save();
            }
            exist.remove();
            console.log("Like Deleted");

        } else {
            //like create push krna h 
            let create = await Like.create({
                user: req.user.id,
                likeable: req.params.id,
                model: req.params.type
            })
            console.log(create);

            likeable.like.push(create);
            likeable.save();
        }
        // console.log(likeable);
        return res.redirect("back");


    } catch (err) {
        console.log("error in creating/deleting like", err);
        return;
    }
}