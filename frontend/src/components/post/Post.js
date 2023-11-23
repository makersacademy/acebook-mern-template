import React, { useState, useEffect } from "react";

const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [token, setToken] = useState(window.localStorage.getItem("token"));



  // Fetch initial like count when the component mounts
  
    const fetchLikeCount = async () => {
      try {
        const response = await fetch(`/posts/like/${post._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.ok) {
          const data = await response.json();
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setLikeCount(post.likes.length);
        } else {
          console.error('Failed to fetch like count');
        }
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };
    
  useEffect(() => {
    fetchLikeCount();
  }, [post._id, token]);


  const handleLikeClick = async () => {
      console.log("token:", token)
      const response = await fetch(`/posts/like/${post._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        window.localStorage.setItem("token", data.token);
        setToken(window.localStorage.getItem("token"));
        setLikeCount(post.likes.length += 1);
      } else {
        console.error('Failed to create like');
      }
      // catch (error) {
      // console.error('Error creating like:', error);
    //}
  };


  return (
    <article data-cy="post" key={post._id}>
      <p>{post.message}</p>
      <button onClick={handleLikeClick}>
        Like ({likeCount})
      </button>
    </article>
  );
};

export default Post;
