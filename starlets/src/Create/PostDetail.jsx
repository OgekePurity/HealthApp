// PostDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './PostDetail.css';


function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="postDetailContainer">
      <h1 className="postTitle">{post.title}</h1>
      <p className="postCategory">Category: {post.category.join(', ')}</p>
      {post.photo && (
        <img 
          className="postImage" 
          src={`http://localhost:4000/images/${post.photo}`} 
          alt={post.title} 
        />
      )}
      <p className="postDescription">{post.description}</p>
      
    </div>
  );
}

export default PostDetail;
