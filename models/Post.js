const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        minlength: 5 // Title must be at least 5 characters long
    },
    content: { 
        type: String, 
        required: true, 
        minlength: 10 // Content must be at least 10 characters long
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true // createdBy is required and references a User
    },
    replies: [replySchema],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
