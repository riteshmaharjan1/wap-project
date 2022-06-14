const path = require('path');
const carModel = require('../model/car.model')

exports.hi = (req, res, next) => {
    const car = new carModel.CarModel({
        condition: "New",
        make: "2006",
        price: 2000,
        distance: "140 miles",
        zip: 52557,
        model: "S4"
    });


    car.save().then(() => {
        console.log("Car data added");
    }, (err) => {
        console.log("Car data added");
    });
    res.send("Car added.");
}



exports.cars = (req, res, next) => {
    // ConsoleLogger("Cars ", req.cookies);
    if (!req.cookies.rememberMe) {
        res.redirect("/login");
    }
    res.render("car");

};

exports.allCars = (req, res, next) => {
    const user = await carModel.CarModel.find();


};




/**
 * Common Console logger
 * @param  {...any} msg message data to be logged
 */
function ConsoleLogger(...msg) {
    console.log("-------Logging console ---- ", msg);
}

exports.FoOFo = (req, res, next) => {
    res.send("404");
}