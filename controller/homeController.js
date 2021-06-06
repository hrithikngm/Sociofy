const Post = require('../model/PostSchema');
const Comment = require('../model/CommentSchema');
const User = require('../model/SignUpSchema');
const { populate } = require('../model/PostSchema');
const Like = require('../model/LikeSchema');

module.exports.home = async function(req, res) {

    try {
        let post = await Post.find({})
            .populate('user')
            .populate({
                path: 'comment',
                populate: {
                    path: 'user'
                },

            }).populate({
                path: 'like',
                populate: { path: 'user' }
            });

        console.log("populated post of home.ejs ", post);



        let user_async = await User.find({});

        return res.render('home', {
            post_list: post,
            all_friend: user_async

        });

    } catch (error) {
        console.log("Error in homeController", error);
        return;
    }
}