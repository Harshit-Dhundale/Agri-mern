import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostDetails = ({ match }) => {
    const [post, setPost] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            const result = await axios(`http://localhost:5000/api/posts/${match.params.postId}`);
            setPost(result.data);
        };
        fetchPost();
    }, [match.params.postId]);

    const addReply = async () => {
        try {
            const result = await axios.post(`http://localhost:5000/api/posts/${match.params.postId}/replies`, {
                text,
                createdBy: 'userId' // Replace 'userId' with actual user ID from context or auth
            });
            setPost(result.data);
            setText('');
        } catch (error) {
            console.error(error);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.replies.map(reply => (
                <div key={reply._id}>
                    <p>{reply.text}</p>
                </div>
            ))}
            <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Write a reply..." />
            <button onClick={addReply}>Reply</button>
        </div>
    );
};

export default PostDetails;
