const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { validatePost, validateReply } = require('../validators/postValidator');
const handleValidationErrors = require('../middleware/errorHandler');

// 🔹 Create a New Post (Protected Route)
router.post(
  '/',
  authMiddleware,
  validatePost,
  handleValidationErrors,
  async (req, res) => {
    try {
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.user._id, // Use authenticated user ID
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
);

// 🔹 Get Paginated Posts
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const posts = await Post.find()
      .populate('createdBy', 'username') // Get only username of creator
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip((page - 1) * limit)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// 🔹 Add a Reply to a Post (Protected Route)
router.post(
  '/:postId/replies',
  authMiddleware,
  validateReply,
  handleValidationErrors,
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);

      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      post.replies.push({
        text: req.body.text,
        createdBy: req.user._id,
      });

      await post.save();
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
