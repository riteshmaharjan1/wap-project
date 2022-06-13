const express = require('express');
const app = express();
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");

const route = require('./routes/carRoute');

//Read the parameters from post request 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets',express.static(path.join(__dirname, 'public', 'stylesheets')));

app.listen(80, function () {
    console.log("App is running in port 80")
})

app.use(route);