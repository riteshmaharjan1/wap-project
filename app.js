const express = require('express');
const app = express();
const ejs = require("ejs");
const path = require("path");
const cookieParser = require("cookie-parser");


app.listen(3000, function () {
    console.log("App is running in port 3000")
})

//Read the parameters from post request 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);