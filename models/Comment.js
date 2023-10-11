const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: { type: String, required: true },
    user_id: { type: String , required: true },
    children: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
})

module.exports = mongoose.model('Comment', Comment);