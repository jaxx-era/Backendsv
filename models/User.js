const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    googleId: String,
    business: Object,
    premium: { type: Boolean, default: false }
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
