import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { forumAPI } from '../../utils/api';
import CommentForm from '../../components/common/CommentForm';
import './PostDetails.css';

const PostDetails = () => {
  const { postId } = useParams(); // Extract postId from the URL
  const [post, setPost] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await forumAPI.getPost(postId);
        setPost(result.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId]);

  const addReply = async (text) => {
    try {
      await forumAPI.addReply(postId, {
        text,
        createdBy: currentUser?._id  // Use the authenticated user’s ID
      });
      // Fetch the updated post after adding the reply
      const updatedPost = await forumAPI.getPost(postId);
      setPost(updatedPost.data);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div className="replies-section">
        <h3>Replies</h3>
        {post.replies && post.replies.length > 0 ? (
          post.replies.map(reply => (
            <div key={reply._id} className="reply-card">
              <p>{reply.text}</p>
              <p>
                <em>by {reply.createdBy?.username || 'Anonymous'}</em>
              </p>
            </div>
          ))
        ) : (
          <p>No replies yet.</p>
        )}
      </div>

      <CommentForm onSubmit={addReply} />

      <button onClick={() => navigate('/forum')} className="btn btn-secondary">
        Return to Forum
      </button>
    </div>
  );
};

export default PostDetails;