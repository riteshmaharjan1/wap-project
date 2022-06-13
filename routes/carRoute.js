const express = require('express');
const route = express.Router();
const carController = require('../controller/carController');

route.get("/hi", carController.hi);


module.exports = route;