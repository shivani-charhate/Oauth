const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userName:String,
    googleID:String,
    thumbnail:String,
});
exports.module = mongoose.model('user',userSchema);