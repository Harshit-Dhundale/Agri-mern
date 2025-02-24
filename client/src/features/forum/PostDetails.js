// client/src/features/forum/PostDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { forumAPI } from "../../utils/api";
import CommentForm from "../../components/common/CommentForm";
import HeroHeader from "../../components/common/HeroHeader"; // Import the hero component
import "./PostDetails.css";

const PostDetails = () => {
  const { postId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await forumAPI.getPost(postId);
        setPost(result.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [postId]);

  const handleEditToggle = () => {
    setEditing(true);
    setEditForm({ title: post.title, content: post.content });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await forumAPI.updatePost(postId, editForm);
      setPost(updated.data);
      setEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await forumAPI.deletePost(postId);
      navigate("/forum");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const addReply = async (text) => {
    try {
      await forumAPI.addReply(postId, { text, createdBy: currentUser?._id });
      const updatedPost = await forumAPI.getPost(postId);
      setPost(updatedPost.data);
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <>
      {/* Hero Header for open discussion */}
      <HeroHeader
        title="Open Discussion"
        subtitle="Join the conversation and share your insights."
        backgroundImage="/assets/head/forum.jpg"  // Ensure this image exists in your public folder.
      />

      <div className="post-details">
        {editing ? (
          <form onSubmit={handleEditSubmit} className="edit-post-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={editForm.content}
                onChange={handleEditChange}
                required
              ></textarea>
            </div>
            <div className="edit-buttons">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div className="post-meta">
              <span>By {post.createdBy?.username || "Anonymous"}</span>
            </div>
            {currentUser &&
              post.createdBy &&
              currentUser._id.toString() ===
                (typeof post.createdBy === "object"
                  ? post.createdBy._id.toString()
                  : post.createdBy.toString()) && (
                <div className="post-actions">
                  <button
                    onClick={handleEditToggle}
                    className="btn btn-secondary"
                  >
                    Edit Post
                  </button>
                  <button onClick={handleDeletePost} className="btn btn-danger">
                    Delete Post
                  </button>
                </div>
              )}
          </>
        )}

        <div className="replies-section">
          <h3>Replies</h3>
          {post.replies && post.replies.length > 0 ? (
            post.replies.map((reply) => (
              <div key={reply._id} className="reply-card">
                <p>{reply.text}</p>
                <p className="reply-meta">
                  <em>by {reply.createdBy?.username || "Anonymous"}</em>
                </p>
              </div>
            ))
          ) : (
            <p>No replies yet.</p>
          )}
        </div>

        <CommentForm onSubmit={addReply} />
        <button onClick={() => navigate("/forum")} className="btn btn-secondary">
          Return to Forum
        </button>
      </div>
    </>
  );
};

export default PostDetails;