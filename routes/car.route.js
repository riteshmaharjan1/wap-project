const express = require('express');
const route = express.Router();
const carController = require('../controller/car.controller');

route.get("/hi", carController.hi);

route.get("/car", carController.cars);

//call this from ajax
route.get("/allCars", carController.allCars);


//404 page- work on this
route.use(carController.FoOFo);

//And Also work on API end point issue

module.exports = route;