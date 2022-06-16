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
        // res.status(200).render("car", { message: "Car added" });
        res.redirect('/car');

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
        res.redirect("/login");
    }
};

exports.add = (req, res, next) => {
    if (!req.cookies.rememberMe) {
        res.render("/login", { message: "" });
    }
    res.render("add");
};

exports.edit = (req, res, next) => {
    if (!req.cookies.rememberMe) {
        res.render("/login", { message: "" });
    }
    res.render("edit");
};


exports.getCar = async (req, res, next) => {
    let _id = req.params.id;
    const car = await carModel.CarModel.findById(_id);
    // ConsoleLogger("Single Car", cars);
    if (car != null) {
        res.status(200).send(car);
    } else {
        res.status(404).send({ message: "Car not found." });
    }
};

exports.allCars = async (req, res, next) => {

    let property = req.params.property;
    let value = req.params.value;
    let sort = req.params.sort;
    // console.log(property, value, sort);

    let sortType = { price: 1 };
    if (sort == "desc") {
        sortType = { price: -1 };
    }
    console.log(sortType);
    let findType = {};
    findType[property] = value;
    console.log(findType);

    let cars;
    // console.log(value);
    // if (property == "condition") {
    //     cars = await carModel.CarModel.find({ condition: value }).sort(sortType);
    // } else if (property == "make") {
    //     cars = await carModel.CarModel.find({ make: value }).sort(sortType);
    // } else if (property == "model") {
    //     cars = await carModel.CarModel.find({ model: value }).sort(sortType);
    // } else {
    //     cars = await carModel.CarModel.find().sort(sortType);
    // }



    if (property == "condition" || property == "make" || property == "model") {
        cars = await carModel.CarModel.find(findType).sort(sortType);
    } else {
        cars = await carModel.CarModel.find().sort(sortType);
    }

    if (cars != null) {
        res.status(200).send(cars);
    } else {
        res.status(500).send({ message: "Something went wrong." });
    }
};

exports.deleteCar = async (req, res, next) => {
    let _id = req.params.id;
    // let _id = "62a7a674cac2d04a43d42c60";
    const car = await carModel.CarModel.findByIdAndDelete(_id);
    //think about removing item from table and refreshing the table view    

    if (car != null) {
        // res.status(200).send({ message: "Car deleted successfully", deletedCar: car });
        res.redirect('/car');
    } else {
        res.status(404).json({ message: "Item not found in database." });
    }
};

exports.editCar = async (req, res, next) => {
    let _id = req.params.id;
    const updatedData = req.body;

    // let _id = "62a7a674ccc2d04a43d42c60";
    // const updatedData = {s
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
        // res.status(200).render("car",  { message: "Car updated successfully", updatedCar: editedCar });
        res.redirect('/car');
    } else {
        res.status(500).json({ message: "Something went wrong." });
    }
};


exports.searchCar = async (req, res, next) => {

    //do changes if we need search option as well.
    let condition = req.body.condition;
    let make = req.body.make;
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
        res.status(200).send(result);
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