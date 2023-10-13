const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Table SQL Schema

const Account = new Schema({
    firstname: { type: String, default: 'John'},
    lastname: { type: String, default: 'Bauer' },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true // created_at, updated_at
})

module.exports = mongoose.model('Account', Account);