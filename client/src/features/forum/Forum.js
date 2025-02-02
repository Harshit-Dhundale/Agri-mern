import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { forumAPI } from '../../utils/api';
import Pagination from '../../components/common/Pagination';
import './Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
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

  return (
    <div className="forum-container">
      <h1>Community Forum</h1>
      
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