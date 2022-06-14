const path = require('path');
const userModel = require('../model/user.model');
const carRoute = require('../routes/car.route');


exports.authenticate = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    // let rememberMe = req.body.rememberMe;
    ConsoleLogger("Request body", req.body);

    // let username = "admin";
    // let password = "admin";
    let rememberMe = 1;

    if (rememberMe == 1) {
        res.cookie("rememberMe", 1);
    } else {
        res.clearCookie("rememberMe");
    }
    ConsoleLogger("Request Cookies", req.cookies);

    try {
        const user = await userModel.UserModel.findOne({ username: username });
        ConsoleLogger("data user==>", user);

        if (user != null) {
            if (username == user.username && password == user.password) {
                res.redirect("/car")
            } else {
                //Username or password incorrect
                res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
            }
        } else {
            //User not found in system
            res.render("login", { a: 11 });
        }

    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.registration = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    // console.log("-------loggin console ---- ", "Reached #registration");
    const data = new userModel.UserModel({
        username: username,
        password: password
    });

    try {
        const dataToSave = await data.save();
        res.status(200).send(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


exports.login = (req, res, next) => {
    ConsoleLogger("Reached #login");
    res.render("login", { a: 1 });
}

/**
 * Common Console logger
 * @param  {...any} msg message data to be logged
 */
function ConsoleLogger(...msg) {
    console.log("-------Logging console ---- ", msg);
}