const path = require('path');
const userModel = require('../model/user.model');
const carRoute = require('../routes/car.route');

let userLogged = false;
let rememberMe = false;

exports.authenticate = async (req, res, next) => {
    let username = req.body.email;
    let password = req.body.password;
    let rememberMe = req.body.remember;
    ConsoleLogger("Request body", req.body);

    ConsoleLogger("Request Cookies", req.cookies);

    try {
        const user = await userModel.UserModel.findOne({ username: username });
        ConsoleLogger("data user==>", user);

        if (user != null) {
            if (username == user.username && password == user.password) {
                res.cookie("userLogged", true);
                // console.log(res.cookie);
                console.log("RAJENDRA", rememberMe == 'true', rememberMe == '1', rememberMe == 1);
                if (rememberMe == 'true' || rememberMe == '1') {
                    res.cookie("rememberMe", true, { expires: new Date(Date.now() + 900000), httpOnly: true });
                } else {
                    res.clearCookie("rememberMe");
                }
                res.redirect("/car");
            } else {
                res.clearCookie("userLogged");
                res.clearCookie("rememberMe");
                //Username or password incorrect
                res.status(500).render(path.join(__dirname, '../', 'views', 'login.html'),
                    { message: "Username or password incorrect." });
            }
        } else {
            res.clearCookie("userLogged");
            res.clearCookie("rememberMe");
            //User not found in system
            res.status(500).render("login", { message: "User not found in the system." });
            // res.redirect("/login");
        }
    } catch (error) {
        res.clearCookie("userLogged");
        res.clearCookie("rememberMe");
        res.status(500).send({ message: error.message })
    }
}

exports.registration = async (req, res, next) => {
    let username = req.body.email;
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

    ConsoleLogger("Reached #login", req.cookies);
    // console.log(userLogged, rememberMe);

    if (userLogged == 'true' || rememberMe == 'true') {
        res.redirect("/car");
    } else {
        res.render("login", { message: "" });
    }
}

exports.logginMiddleware = (req, res, next) => {
    // ConsoleLogger("Reached #checkMiddle", req.cookies);
    // ConsoleLogger("RAJENDRA => ", userLogged == 'true', rememberMe == true);
    userLogged = req.cookies.userLogged;
    rememberMe = req.cookies.rememberMe;
    next();
}

exports.logout = (req, res, next) => {

    // ConsoleLogger("Reached #logout", req.cookies);
    res.clearCookie("userLogged");
    res.clearCookie("rememberMe");
    res.redirect("login");
    // res.render("login", { message: "User logged out successfully" });
}

/**
 * Common Console logger
 * @param  {...any} msg message data to be logged
 */
function ConsoleLogger(...msg) {
    console.log("-------Logging console ---- ", msg);
}