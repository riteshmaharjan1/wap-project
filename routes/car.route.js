const express = require('express');
const route = express.Router();
const carController = require('../controller/car.controller');

route.get("/testADD", carController.testADD);

route.get("/car", carController.cars);
route.get("/add", carController.add);
route.get("/edit", carController.edit);

//call this from ajax
route.post("/addCar", carController.addCar);
route.get("/getCar", carController.getCar);
route.get("/allCars", carController.allCars);
route.post("/deleteCar", carController.deleteCar);
route.put("/editCar", carController.editCar);

//404 page- work on this
route.use(carController.FoOFo);

//And Also work on API end point issue

module.exports = route;