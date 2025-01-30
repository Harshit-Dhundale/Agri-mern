const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { validatePost, validateReply } = require('../validators/postValidator');
const handleValidationErrors = require('../middleware/errorHandler');

// Create post with validation
router.post('/', 
  authMiddleware,
  validatePost,
  handleValidationErrors,
  async (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            createdBy: req.user._id
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get posts with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const posts = await Post.find()
            .populate('createdBy', 'username')
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add reply with validation
router.post('/:postId/replies', 
  authMiddleware,
  validateReply,
  handleValidationErrors,
  async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        post.replies.push({
            text: req.body.text,
            createdBy: req.user._id
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;