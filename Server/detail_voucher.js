const mongoose = require('mongoose');
const Detail_Voucher = mongoose.Schema({
    id_Voucher : String,
    id_Account : String,
    state : Boolean,
})
mongoose.model('Detail_Voucher', Detail_Voucher);