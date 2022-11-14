const mongoose = require('mongoose');
const date = new Date();
var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
const Payment = mongoose.Schema({
    id_Cart : String,
    id_DetailVoucher : String,
    payment_Method : String,
    receive_Method : String,
    confirm_Order : String,
    order_Status : String,
    state : Boolean,
    total : Number,
    createdAt : {
        type : Date,
        default : newDate,
    }

})
mongoose.model('Payment', Payment);