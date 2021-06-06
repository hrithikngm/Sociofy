const User = require('../model/SignUpSchema');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
const transporter = require('../config/node-mailer');
const crypto = require("crypto");

module.exports.profile = function(req, res) {
    console.log(req.user);
    // if (req.user) {
    // return res.render("profile");
    // }
    User.findById(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
            return;
        }
        return res.render("profile", {
            all_user: user
        });
    })

}

module.exports.user = function(req, res) {
    return res.end("<h1>  User</h1>");
}

module.exports.create = function(req, res) {
    console.log("hello on conifg file maile", transporter);
    User.create(req.body, async function(err, newContact) {
        if (err) {
            console.log("Error in db");
            return;
        }
        console.log("****", newContact);

        transporter.transporter.sendMail({
            from: "acfsociofy@gmail.com", // sender address
            to: newContact.email, // list of receivers
            subject: "Hello ACF", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>SignUp Successfully!!</b>", // html body
        }, function(err, info) {
            if (err) {
                console.log("error in sending mail", err);
                return;
            }
            console.log(info);
        });



    })
    return res.redirect("back");
}

module.exports.createSession = function(req, res) {

    // console.log(req.body);
    // console.log("start", res.cookie);
    // User.findOne({ email: req.body.email }, function(err, user) {
    //     if (err) {
    //         console.log(`Error : ${err}`);
    //         return res.redirect('back');
    //     }
    //     if (user) {
    //         if (user.password != req.body.password) {
    //             return res.redirect('back');
    //         } else {
    //             console.log("YHA PE ARHA H");
    //             res.cookie('user_id', user._id);

    //             // console.log(res.cookie);
    //             return res.redirect("/user/profile");
    //         }

    //     } else {
    //         return res.redirect('back');
    //     }

    // });
    req.flash('success', 'Logged In successfully');
    // req.flash("success", "Logged In successfully!!");
    return res.redirect("/");

    // User.findOne({}, function(err, result) {
    //     if (err) throw err;
    //     console.log(result.name);
    //   });


}

module.exports.signIn = function(req, res) {
    req.flash("success", "Logged in successfully!!");
    return res.render('../view/user_signin.ejs');
}

module.exports.signout = function(req, res) {

    req.logout();
    req.flash("success", "Logged Out successfully!!");
    res.clearCookie('user_id');
    // res.cookie("user_id", req.cookies.user_id)
    return res.redirect('/');
}

module.exports.signUp = function(req, res) {
    return res.render("user_signup");
}

module.exports.update = async function(req, res) {
    // console.log(req.body);
    try {

        let ans = await User.findById(req.user.id);

        console.log(".....................", User.uploadAvatar);
        User.uploadAvatar(req, res, function(err) {
            if (err) {
                console.log(err);
            }
            if (req.file) {
                // newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
                // newItem.img.contentType = ‘image/png’;

                ans.avatar = User.uploadpath + "/" + req.file.filename;
            }

            ans.name = req.body.name;
            ans.email = req.body.email;
            console.log(ans);
            ans.save();
            return res.redirect('back');
        })









    } catch (err) {
        console.log("Error in multer", err);
        return res.redirect("back");
    }


}

module.exports.forgotpass = async function(req, res) {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new Error("User does not exist");
    }

    let password = crypto.randomBytes(20).toString('hex')
    user.password = password
    user.save();

    transporter.transporter.sendMail({
        from: "acfsociofy@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: "Reset Password", // Subject line
        text: "Hello world?", // plain text body
        html: `<h1>Here Your random generated password!!</h1>:<b>${password}this is onetime password you can change your password in upafte profile section`, // html body
    }, function(err, info) {
        if (err) {
            console.log("error in sending mail", err);
            return;
        }
        console.log(info);
    });
    return res.redirect("/user/sign-in");


    // let token = await Token.findOne({ userId: user._id });
    // if (token) {
    //     await token.deleteOne()
    // };
}