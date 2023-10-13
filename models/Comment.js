const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    content: { type: String, required: true },
    user_id: { type: mongoose.Types.ObjectId , ref: "Account" },
    children: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
})

module.exports = mongoose.model('Comment', Comment);