const mongoose = require('mongoose');
const food = mongoose.Schema({
    name : String,
    img : String,
    type : String,
    detail : String,
    price : Number,
})
mongoose.model('Food', food);