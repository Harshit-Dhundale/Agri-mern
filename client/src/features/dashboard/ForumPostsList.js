// client/src/features/dashboard/ForumPostsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumPostsList.css';

const ForumPostsList = ({ forumPosts }) => {
  const navigate = useNavigate();

  // const handleViewAll = () => {
  //   navigate('/forum');
  // };

  const handleViewPost = (postId) => {
    navigate(`/forum/${postId}`);
  };

  return (
    <div className="forum-posts-list card">
      <h2>Your Forum Posts</h2>
      {forumPosts.length > 0 ? (
        <ul>
          {forumPosts.map((post) => (
            <li key={post._id}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
              <button className="btn btn-link" onClick={() => handleViewPost(post._id)}>
                View Full Post
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-posts">
          <p>You haven't created any forum posts yet. Share your ideas with the community!</p>
          <button className="btn btn-primary" onClick={() => navigate('/forum')}>
            Create a Post
          </button>
        </div>
      )}
      {/* {forumPosts.length > 0 && (
        <div className="view-all-posts">
          <button className="btn btn-secondary" onClick={handleViewAll}>
            View All Forum Posts
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ForumPostsList;