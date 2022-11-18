const mongoose = require('mongoose');
const food = mongoose.Schema({
    name : String,
    img : String,
    type : String,
    detail : String,
    price : Number,
    deleted : Boolean,
})
mongoose.model('Food', food);