const Comment = require('../models/Comment');

async function create_comment(content, user_id) {
    let myComment = new Comment({
        content: content,
        user_id: user_id,
        children: []
    }).save();
    
    return myComment;
}

async function add_child_comment(content, user_id, parent_id) {
    let parentComment = await Comment.findById(parent_id);

    let childComment = await new Comment({
        content: content,
        user_id: user_id,
        children: []
    }).save() // object_id

    parentComment.children.push(childComment);
    await parentComment.save();
    return childComment;
}

async function get_comments(user_id) {
    let myComments = await Comment.find({user_id: user_id})
        .populate({path: 'children'})
        .where({children: []})
    
    return myComments;
}


module.exports = {
    create_comment,
    add_child_comment,
    get_comments
}

