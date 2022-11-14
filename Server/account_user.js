const mongoose = require('mongoose');
var date = new Date();
var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
const account_user = mongoose.Schema({
    username : String,
    password : String,
    fullname : String,
    address : String,
    phone : String,
    email : String,
    avatar : String,
    deleted : Boolean,
})
mongoose.model('Account_User', account_user);