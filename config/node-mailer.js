const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
const keys = require('./keys');




// async..await is not allowed in global scope, must use a wrapper
// async function main() {
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
module.exports.transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: keys.user,
        pass: keys.pass // generated ethereal password
    },
});

// module.exports = { transporter };