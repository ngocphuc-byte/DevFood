const mongoose = require('mongoose');
const News = mongoose.Schema({
    title : String,
    content : String,
})
mongoose.model('News', News);