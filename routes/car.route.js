const express = require('express');
const route = express.Router();
const carController = require('../controller/car.controller');

route.get("/hi", carController.hi);

route.get("/car", carController.cars);

//call this from ajax
route.post("/getCar", carController.getCar);
route.get("/allCars", carController.allCars);
route.post("/deleteCar", carController.deleteCar);

//404 page- work on this
route.use(carController.FoOFo);

//And Also work on API end point issue

module.exports = route;