const Post = require('../model/PostSchema');
const Comment = require('../model/CommentSchema');
const User = require('../model/SignUpSchema');

module.exports.home = async function(req, res) {


    // Post.find({}, function(err, post) {
    //     console.log("printing post and commnets");
    //     console.log(post)
    //     res.render('home', {
    //         post_list: post,
    //     });

    // })
    try {
        let post = await Post.find({}).populate('user').populate({
            path: 'comment',
            populate: { path: 'user' }
        });

        let user_async = await User.find({});

        return res.render('home', {
            post_list: post,
            all_friend: user_async
        });

    } catch (error) {
        console.log("Error in homeController", error);
        return;
    }




    // Post.find({}).populate('user')
    //     .populate({
    //         path: 'comment',
    //         populate: { path: 'user' }
    //     })
    //     .exec(function(err, posts) {
    //         if (err) {
    //             console.log("error");
    //             return;
    //         }

    //         User.find({},
    //             function(err, user) {
    //                 if (err) {
    //                     console.log(err);
    //                     return;
    //                 }
    //                 return res.render('home', {
    //                     post_list: posts,
    //                     all_friend: user
    //                 });


    //             })

    //     })
}