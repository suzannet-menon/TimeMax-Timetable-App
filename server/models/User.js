//defines the shape of a User document in MongoDB, and gives you a JS interface to work with it.

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique:true},
    password: { type: String, required: true},
    name: { type: String, required: true},
    createdAt: {type: Date, default:Date.now}
});

module.exports = mongoose.model('User', userSchema); //makes this model importable elsewhere: const User = require('../models/User') in your routes.
