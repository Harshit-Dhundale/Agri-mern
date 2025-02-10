// features/forum/Forum.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
// Removed unused useNavigate import to clear the ESLint warning
import { forumAPI } from '../../utils/api';
import Pagination from '../../components/common/Pagination';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newPostError, setNewPostError] = useState('');
  const [newPostLoading, setNewPostLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadPosts = async (page = 1) => {
    try {
      const { data } = await forumAPI.getPosts(page);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to load posts:", error);
    }
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  // Handlers for the inline new post form
  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    setNewPostLoading(true);
    setNewPostError('');
    try {
      // The backend validator requires:
      // title: at least 5 characters, content: at least 10 characters.
      if (newPost.title.trim().length < 5) {
        setNewPostError("Title must be at least 5 characters long.");
        setNewPostLoading(false);
        return;
      }
      if (newPost.content.trim().length < 10) {
        setNewPostError("Content must be at least 10 characters long.");
        setNewPostLoading(false);
        return;
      }
      const response = await forumAPI.createPost(newPost);
      // Prepend the new post to the list so it's visible immediately
      setPosts([response.data, ...posts]);
      setShowNewPostForm(false);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      // If the backend returns an errors array, join the messages.
      const errMsg = error.errors
        ? error.errors.map((err) => err.msg).join(", ")
        : error.message || 'Failed to create post.';
      console.error('Error creating post:', error);
      setNewPostError(errMsg);
    } finally {
      setNewPostLoading(false);
    }
  };

  return (
    <div className="forum-container">
      <h1>Community Forum</h1>
      
      {/* Toggle New Post Form */}
      <div className="new-post-toggle">
        {showNewPostForm ? (
          <button onClick={() => setShowNewPostForm(false)} className="btn btn-secondary">
            Cancel New Post
          </button>
        ) : (
          <button onClick={() => setShowNewPostForm(true)} className="btn btn-primary">
            Create New Post
          </button>
        )}
      </div>

      {/* Inline New Post Form */}
      {showNewPostForm && (
        <div className="new-post-form-inline">
          <h2>Create New Post</h2>
          <form onSubmit={handleNewPostSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleNewPostChange}
                placeholder="Enter post title"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleNewPostChange}
                placeholder="Enter post content"
                required
              ></textarea>
            </div>
            {newPostError && <p className="error-message">{newPostError}</p>}
            <button type="submit" disabled={newPostLoading} className="btn btn-primary">
              {newPostLoading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </div>
      )}
      
      {/* List of Posts */}
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <div className="post-meta">
                <span>By {post.createdBy?.username || 'Anonymous'}</span>
                <Link to={`/forum/${post._id}`} className="view-post-link">
                  View Discussion
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts">No posts available</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Forum;