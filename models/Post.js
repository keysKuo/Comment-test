const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'Account' },
    content: { type: String }
},
{
    timestamps: true
})

module.exports = mongoose.model('Post', Post);