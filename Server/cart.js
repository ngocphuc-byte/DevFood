const mongoose = require('mongoose');
const date = new Date();
var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
const Cart = mongoose.Schema({
    id_Account : {type : String},
    detail_Cart : [
        {
            id_Food : String,
            quantity : Number,
            price : Number,
        }
    ],
    total : Number,
    state : Boolean,
    createAt : {
        type : Date,
        default : newDate,
    }
})
mongoose.model('Cart', Cart);