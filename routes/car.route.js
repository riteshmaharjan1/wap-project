const express = require('express');
const route = express.Router();
const carController = require('../controller/car.controller');

route.get("/testADD", carController.testADD);

//Default change to either login or cars for localhostt/ call
route.get("/", carController.cars);

route.get("/car", carController.cars);
route.get("/add", carController.add);
route.get("/edit/:id", carController.edit);

//call this from ajax
route.post("/addCar", carController.addCar);
route.get("/getCar/:id", carController.getCar);
route.get("/allCars/:property/:value/:sort", carController.allCars);
route.get("/allCars/:sort", carController.allCars);

//As a backup plan if no parameters are passed, 
route.get("/allCars", carController.allCars);

route.post("/editCar/:id", carController.editCar);
route.get("/deleteCar/:id", carController.deleteCar);

//404 page- work on this
route.use(carController.FoOFo);

//And Also work on API end point issue

module.exports = route;