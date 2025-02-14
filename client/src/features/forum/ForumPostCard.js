import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumAPI } from '../../utils/api';
import CommentForm from '../../components/common/CommentForm';
import './ForumPostCard.css';

const ForumPostCard = ({ post, currentUser, onDelete, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);
  const [replies, setReplies] = useState(post.replies || []);
  const navigate = useNavigate();

  // Toggle inline expansion
  const toggleExpand = async () => {
    if (!expanded) {
      // Optionally, refresh the post to get the latest replies
      try {
        const res = await forumAPI.getPost(post._id);
        onUpdate(res.data);
        setReplies(res.data.replies || []);
      } catch (error) {
        console.error("Failed to refresh post:", error);
      }
    }
    setExpanded(!expanded);
  };

  // Add a new reply (using the CommentForm)
  const addReply = async (text) => {
    try {
      await forumAPI.addReply(post._id, { text, createdBy: currentUser?._id });
      const res = await forumAPI.getPost(post._id);
      onUpdate(res.data);
      setReplies(res.data.replies || []);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  // Handle deletion (only if user is the creator)
  const handleDelete = async () => {
    try {
      await forumAPI.deletePost(post._id);
      onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="forum-post-card card">
      <h3>{post.title}</h3>
      <p className="post-content">
        {expanded ? post.content : (post.content.length > 150 ? post.content.substring(0, 150) + '...' : post.content)}
      </p>
      <div className="post-meta">
        <span>By {post.createdBy?.username || 'Anonymous'}</span>
        <button onClick={toggleExpand} className="btn btn-link">
          {expanded ? "Collapse Discussion" : "View Discussion"}
        </button>
        {expanded && (
          <>
            <button onClick={() => navigate(`/forum/${post._id}`)} className="btn btn-link">
              Open in New Page
            </button>
            {currentUser && post.createdBy === currentUser._id && (
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            )}
          </>
        )}
      </div>
      {expanded && (
        <div className="replies-section">
          {replies.length > 0 ? (
            replies.map(reply => (
              <div key={reply._id} className="reply-card">
                <p>{reply.text}</p>
                <p className="reply-meta"><em>By {reply.createdBy?.username || 'Anonymous'}</em></p>
              </div>
            ))
          ) : (
            <p className="no-replies">No replies yet.</p>
          )}
          <CommentForm onSubmit={addReply} />
        </div>
      )}
    </div>
  );
};

export default ForumPostCard;