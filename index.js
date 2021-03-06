const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const localpassort = require('./config/passport_local_storage');
const Noty = require('noty');
const googleauth = require('./config/passport-google-auth');
const socketio = require('socket.io');
const sockets = require('./config/chat_sockets');


const app = express();

const routes = require("./routes");
// const db=require('./')
app.use(cookieParser());
app.use(express.urlencoded());

app.use(express.static("assets")); //abb asset file use kr sakte haii;
app.use("/upload", express.static("upload"));
app.set('views', './view');
app.set('view engine', 'ejs');
const db = require('./config/mongooose');


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    withCredentials: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

//socket.io
const http = require('http').Server(app);
sockets.chatSockets(http)
http.listen(3000, function() {
    console.log('listening on *:3000');
});






//documentation padho passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticate);

app.use(flash());
app.use(function(req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


//app ke routes passsport.intilaze ke baad krna 
app.use('/', routes);



app.listen(8080, function(err) {
    if (err) {
        console.log("server not working");
    }

    console.log("server start at port", 8080);
})