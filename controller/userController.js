const User = require('../model/UsersSignUpSchema');


module.exports.profile = function(req, res) {
    console.log("Inside Profile", req.cookies);
    if (req.cookies.user_id)
        return res.render("profile");
    else
        return res.redirect('back');
}

module.exports.user = function(req, res) {
    return res.end("<h1>  User</h1>");
}

module.exports.create = function(req, res) {
    console.log(req.body);
    User.create(req.body, function(err, newContact) {
        if (err) {
            console.log(err);
            return;

        }
        console.log("***", newContact);
    });



    // User.insertOne(req.body, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");

    //   });
    return res.redirect("back");

}

module.exports.signUp = function(req, res) {
    return res.render('user_signup', {
        title: "Sign Up"

    })
}

module.exports.signIn = function(req, res) {

    return res.render('user_signin', {
        title: "Sign In"
    })
}

module.exports.createSession = function(req, res) {
    console.log(req.body);

    console.log("start", res.cookie);
    User.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            console.log(`Error : ${err}`);
            return res.redirect('back');
        }
        if (user) {
            if (user.password != req.body.password) {
                return res.redirect('back');
            } else {
                console.log("YHA PE ARHA H");
                res.cookie('user_id', user._id);

                // console.log(res.cookie);
                return res.redirect("/user/profile");
            }

        } else {
            return res.redirect('back');
        }

    });



    // User.findOne({}, function(err, result) {
    //     if (err) throw err;
    //     console.log(result.name);
    //   });

}

module.exports.signout = function(req, res) {
    res.clearCookie('user_id');
    // res.cookie("user_id", req.cookies.user_id)
    return res.redirect('/');
}