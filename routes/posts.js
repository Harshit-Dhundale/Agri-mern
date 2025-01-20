const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// POST route to create a new forum post
router.post('/', async (req, res) => {
    const { title, content, createdBy } = req.body;
    try {
        const newPost = new Post({ title, content, createdBy });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET route to fetch all forum posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('createdBy', 'username');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST route to add a reply to a post
router.post('/:postId/replies', async (req, res) => {
    const { text, createdBy } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        post.replies.push({ text, createdBy });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
