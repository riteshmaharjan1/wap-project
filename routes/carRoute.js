const express = require('express');
const route = express.Router();
const carController = require('../controller/carController');

route.get("/", carController.login);

module.exports = route;