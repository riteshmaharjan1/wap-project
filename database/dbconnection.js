//MONGOOSE CONNECTION
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected => ", process.env.MONGODB_URL))
    .catch(err => console.log(err));