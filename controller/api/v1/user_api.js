const User = require('../../../model/SignUpSchema');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email })

        if (user.password !== req.body.password) {
            return res.json(420, {
                message: "Invalid password"

            });
        }

        return res.json(200, {
            message: "helelele tokken there",
            data: {
                token: jwt.sign(user.toJSON(), 'acf', { expiresIn: '1h' })
            }
        })
    } catch {
        console.log('error');
        res.json(401, {
            message: "error in tokkkkens"
        })
    };
}