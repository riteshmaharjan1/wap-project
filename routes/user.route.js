const express = require('express');
const route = express.Router();
const userController = require('../controller/login.controller');


route.use("/login", userController.logginMiddleware);
route.get("/login", userController.login);

route.post("/auth", userController.authenticate);

route.get("/reg", userController.registration);
route.get("/logout", userController.logout);


module.exports = route;