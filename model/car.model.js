const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    condition: String,
    make: String,
    price: Number,
    distance: String,
    zip: Number,
    model: String
})

const CarModel = mongoose.model("Car", carSchema);

module.exports = { CarModel };