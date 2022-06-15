const path = require('path');
const carModel = require('../model/car.model')

exports.testADD = (req, res, next) => {
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

exports.addCar = (req, res, next) => {
    let condition = req.body.condition;
    let make = req.body.make;
    let price = req.body.price;
    let distance = req.body.distance;
    let zip = req.body.zip;
    let model = req.body.model;

    const car = new carModel.CarModel({
        condition: condition,
        make: make,
        price: price,
        distance: distance,
        zip: zip,
        model: model
    });

    car.save().then(() => {
        // console.log("Car data added");
        res.status(200).send({ message: "Car added" });
    }, (err) => {
        // console.log("Car data added");
        res.status(500).send({ message: "Something went wrong" });
    });
}


exports.cars = (req, res, next) => {
    // ConsoleLogger("Cars ", req.cookies);
    let userLogged = req.cookies.userLogged;
    let rememberMe = req.cookies.rememberMe;

    if (userLogged == 'true' || rememberMe == 'true') {
        res.status(200).render("car");
    } else {
        res.render("login", { message: "" });
    }
};


exports.getCar = async (req, res, next) => {
    let _id = req.body.objectId;
    const car = await carModel.CarModel.findById(_id);
    ConsoleLogger("Single Car", cars);
    if (car != null) {
        res.status(200).send(car);
    } else {
        res.status(404).send({ message: "Car not found." });
    }
};

exports.allCars = async (req, res, next) => {
    const cars = await carModel.CarModel.find();
    // ConsoleLogger("All Cars", cars);
    if (cars != null) {
        res.status(200).send(cars);
    } else {
        res.status(500).send({ message: "Something went wrong." });
    }
};

exports.deleteCar = async (req, res, next) => {
    let _id = req.body.objectId;
    const car = await carModel.CarModel.findByIdAndDelete(_id);
    //think about removing item from table and refreshing the table view    

    if (car != null) {
        res.status(200).send({ message: "Car deleted successfully", deletedCar: car });
    } else {
        res.status(404).send({ message: "Item not found in database." });
    }
};

exports.editCar = async (req, res, next) => {
    let _id = req.body.objectId;
    const updatedData = req.body;

    // let _id = "62a7a674ccc2d04a43d42c60";
    // const updatedData = {
    //     condition: "Used/For now",
    //     make: "2011",
    //     price: 25000,
    //     model: "HI"
    // };

    const editedCar = await carModel.CarModel.findByIdAndUpdate(
        _id
        , updatedData
    );
    if (editedCar != null) {
        res.status(200).send({ message: "Car updated successfully", deletedCar: car });
    } else {
        res.status(500).send({ message: "Something went wrong." });
    }
};


exports.searchCar = async (req, res, next) => {
    let condition = req.body.condition;
    let style = req.body.bodyStyle;
    let price = req.body.price;
    let distance = req.body.distance;
    let zip = req.body.zip;

    const result = await carModel.CarModel
        .find({
            'condition': condition,
            'style': style,
            'price': price,
            'distance': distance,
            'zip': zip
        }, function (err, list) {
            if (err) return handleError(err);
            return list;
            // res.status(200).send(list);
        });

    if (result != null) {
        res.status(200).send(list);
    } else {
        res.status(500).send({ message: "something went wrong." });
    }
};

/**
 * Common Console logger
 * @param  {...any} msg message data to be logged
 */
function ConsoleLogger(...msg) {
    console.log("-------Logging console ---- ", msg);
}

exports.FoOFo = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', "views", "404.html"));
}