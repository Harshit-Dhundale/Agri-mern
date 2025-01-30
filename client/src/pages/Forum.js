import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Forum = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch posts based on the current page
    const fetchPosts = async (page = 1) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/posts?page=${page}`);
            setPosts(res.data.posts);
            setTotalPages(res.data.totalPages); // Assuming the response contains totalPages
        } catch (error) {
            console.error("Error fetching posts", error);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage); // Fetch posts on component mount and when currentPage changes
    }, [currentPage]);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <div>
            <h1>Community Forum</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <Link to={`/forum/${post._id}`}>View Post</Link>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Forum;
