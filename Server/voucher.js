const mongoose = require('mongoose');
const date = new Date();
var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
const Voucher = mongoose.Schema({
    name : Number, 
    discount : Number,
    minprice : Number,
    special : Boolean,
    point : Number,
    createAt : 
    {
        type : Date,
        // expires : 50000,
        default : newDate,
    },
})
mongoose.model('Voucher', Voucher);