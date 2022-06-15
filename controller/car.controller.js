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
        res.render("/login", { message: "" });
    }
    res.render("car");

};

exports.add = (req, res, next) => {
    if (!req.cookies.rememberMe) {
        res.render("/login", { message: "" });
    }
    res.render("add");

};

exports.edit = (req, res, next) => {
    // ConsoleLogger("Cars ", req.cookies);
    if (!req.cookies.rememberMe) {
        res.render("/login", { message: "" });
    }
    res.render("edit");

};


exports.getCar = async (req, res, next) => {
    let _id = req.body.objectId;
    const car = await carModel.CarModel.findById(_id);
    ConsoleLogger("Single Car", cars);
    res.send(car);
};

exports.allCars = async (req, res, next) => {
    const cars = await carModel.CarModel.find();
    ConsoleLogger("All Cars", cars);
    res.send(cars);
};

exports.deleteCar = async (req, res, next) => {
    let _id = req.body.objectId;
    const car = await carModel.CarModel.findByIdAndDelete(_id);
    //think about removing item from table and refreshing the table view    


};

exports.editCar = async (req, res, next) => {
    let _id = req.body.objectId;
    const updatedData = req.body;
    const options = { new: true };

    const result = await carModel.CarModel.findByIdAndUpdate(
        _id, updatedData, options
    )

    res.send(result)
};


exports.searchCar = async (req, res, next) => {
    let condition = req.body.condition;
    let style = req.body.bodyStyle;
    let price = req.body.price;
    let distance = req.body.distance;
    let zip = req.body.zip;

    const result = await carModel.CarModel
        .find({
            'condition': Tennis,
            'style': style,
            'price': price,
            'distance': distance,
            'zip': zip
        }, function (err, list) {
            if (err) return handleError(err);
        })
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