const Post = require('../model/PostSchema');

module.exports.home = function(req, res) {

    Post.find({}).populate('user').exec(function(err, posts) {
        if (err) {
            console.log("error");
            return;
        }

        return res.render('home', {
            post_list: posts
        });

    })
}