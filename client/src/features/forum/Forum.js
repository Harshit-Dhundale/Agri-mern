import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forumAPI } from '../../utils/api';
import Pagination from '../../components/common/Pagination';
import { useAuth } from '../../context/AuthContext';
import ForumPostCard from './ForumPostCard';
import './Forum.css';

const Forum = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

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

  // Delete post handler (passed to ForumPostCard)
  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  // Update a post (passed to ForumPostCard)
  const updatePost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  return (
    <div className="forum-container">
      <h1>Community Forum</h1>
      {/* You might want a separate page for creating posts */}
      <button onClick={() => navigate('/create-post')} className="btn btn-primary">
        Create New Post
      </button>
      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <ForumPostCard
              key={post._id}
              post={post}
              currentUser={currentUser}
              onDelete={handleDeletePost}
              onUpdate={updatePost}
            />
          ))
        ) : (
          <div className="no-posts">No posts available</div>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Forum;