const path = require('path');
const Car = require('../model/car')

exports.login = (req, res, next) => {
    res.render('login');
}