const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: [true, 'Reply text is required'], 
        minlength: [3, 'Reply must be at least 3 characters long']
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const postSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, 'Title is required'], 
        minlength: [5, 'Title must be at least 5 characters long']
    },
    content: { 
        type: String, 
        required: [true, 'Content is required'], 
        minlength: [10, 'Content must be at least 10 characters long']
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    replies: [replySchema],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
