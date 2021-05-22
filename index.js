const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require("passport");
const localpassort = require('./config/passport_local_storage');

const app = express();

const routes = require("./routes");
// const db=require('./')
app.use(cookieParser());
app.use(express.urlencoded());

app.set('views', './view');
app.set('view engine', 'ejs');
const db = require('./config/mongooose')



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    withCredentials: true,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

//documentation padho
app.use(passport.initialize());
app.use(passport.session());
// (passport);
app.use('/', routes);




//   app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.listen(8080, function(err) {
    if (err) {
        console.log("lauda ni chl rha");
    }

    console.log("server start at port", 8080);
})