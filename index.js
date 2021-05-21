const express = require('express');

const app = express();

const routes = require("./routes");
// const db=require('./')

app.set('views', './view');
app.set('view engine', 'ejs');
const db = require('./config/mongooose')


app.use('/', routes);

app.listen(8080, function(err) {
    if (err) {
        console.log("lauda ni chl rha");
    }

    console.log("server start at port", 8080);
})