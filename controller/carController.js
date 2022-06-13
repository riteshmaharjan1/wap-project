const path = require('path');
const Car = require('../model/car')

exports.hi = (req, res, next) => {
    res.send('CHECK 123');
}