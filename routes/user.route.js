const express = require('express');
const route = express.Router();
const userController = require('../controller/login.controller');


route.get("/login", userController.login);

route.post("/auth", userController.authenticate);

route.get("/reg", userController.registration);


module.exports = route;