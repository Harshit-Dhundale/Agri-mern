import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext'; // For accessing currentUser
import { forumAPI } from '../../utils/api';  // For handling API calls
import CommentForm from '../../components/common/CommentForm';  // New component for handling the reply form
import './PostDetails.css';

const PostDetails = ({ match }) => {
    const [post, setPost] = useState(null);
    const { currentUser } = useAuth();  // Access the current user data from the context

    // Fetch the post details
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const result = await forumAPI.getPost(match.params.postId);
                setPost(result.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [match.params.postId]);

    // Function to handle adding a reply
    const addReply = async (text) => {
        try {
            await forumAPI.addReply(match.params.postId, {
                text,
                createdBy: currentUser.id  // Use the logged-in user's ID
            });

            // Fetch the updated post after adding the reply
            const updatedPost = await forumAPI.getPost(match.params.postId);
            setPost(updatedPost.data);
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };

    if (!post) return <p>Loading...</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>

            <div>
                <h3>Replies</h3>
                {post.replies.map(reply => (
                    <div key={reply._id}>
                        <p>{reply.text}</p>
                        <p><em>by {reply.createdBy.username}</em></p> {/* Assuming replies have createdBy field */}
                    </div>
                ))}
            </div>

            {/* CommentForm to handle the reply submission */}
            <CommentForm onSubmit={addReply} />
        </div>
    );
};

export default PostDetails;
