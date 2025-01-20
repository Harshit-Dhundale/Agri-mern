import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Forum = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const result = await axios('http://localhost:5000/api/posts');
            setPosts(result.data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Community Forum</h1>
            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <Link to={`/forum/${post._id}`}>View Post</Link>
                </div>
            ))}
        </div>
    );
};

export default Forum;
