require('dotenv').config();

const express = require('express');
const app = express();

const ejs = require("ejs");
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

const path = require("path");

//Read the parameters from post request 
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//Static path set
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "images")));
app.use(express.static(path.join(__dirname, "public", "stylesheets")));

//Required database
require("./database/dbconnection");

//ROUTES
const carRoute = require('./routes/car.route');
const userRoute = require('./routes/user.route');

//SERVER HOST
app.listen(80, function () {
    console.log("App is running in port 80 ");
})

//ROUTE ADDITION
app.use(userRoute);
app.use(carRoute);