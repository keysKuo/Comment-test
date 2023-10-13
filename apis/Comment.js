const Comment = require('../models/Comment');

async function create_comment(content, user_id, post_id) {
    let myComment = new Comment({
        content: content,
        user_id: user_id,
        children: [],
        post: post_id
    }).save();
    
    return myComment;
}

async function add_child_comment(content, user_id, parent_id) {
    let parentComment = await Comment.findById(parent_id);

    let childComment = await new Comment({
        content: content,
        user_id: user_id,
        children: [],
        post: parentComment.post
    }).save() // object_id


    parentComment.children.push(childComment._id);
    await parentComment.save();
    return childComment;
}

async function get_comments(post_id) {
    let myComments = await Comment.find({post: post_id})
        .populate({path: 'children', populate: { path: 'user_id'}})
        .populate({path: 'post'})
        .populate({path: 'user_id'})
    
    return myComments;
}


module.exports = {
    create_comment,
    add_child_comment,
    get_comments
}

