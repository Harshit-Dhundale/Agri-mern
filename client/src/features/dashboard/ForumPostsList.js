// client/src/features/dashboard/ForumPostsList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForumPostsList.css';

const ForumPostsList = ({ forumPosts }) => {
  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate('/forum');
  };

  return (
    <div className="forum-posts-list card">
      <h2>Your Forum Posts</h2>
      {forumPosts.length > 0 ? (
        <ul>
          {forumPosts.map((post) => (
            <li key={post._id}>
              <strong>{post.title}</strong>
              <p>{post.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-posts">
          <p>You haven't created any forum posts yet. Share your ideas with the community!</p>
          <button className="btn btn-primary" onClick={handleCreatePost}>
            Create a Post
          </button>
        </div>
      )}
    </div>
  );
};

export default ForumPostsList;