import React, { useState, useEffect } from "react";
import MessageHeader from "../messageHeader/MessageHeader";
import CommentFeed from "../commentFeed/CommentFeed";


const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

 // generating image path
  // **** NOTICE: change to different url when app deployed ****
  let imageSource = `http://localhost:8080/uploads/${post.image_path}`;
  // console.log("POST COMPONENT:", post._id)

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
      <div id="post-msg-header">
        <MessageHeader user_id={post.user_id}/>
      </div>
      <div id="post-msg-content">
        {post.message}
      </div>      

      <br />
      {/* if image exists display it */}
      {post.image_path && (
        <img
          src={imageSource}
          alt={imageSource}
          width={"700px"}
          data-cy="post-image"
        />
      )}
      <br />
      <button onClick={handleLikeClick}>
        Like ({likeCount})
      </button>
      <br />
      <article data-cy="comment">
        <CommentFeed post_id={post._id} />
      </article>
      {/* line added for visibility, remove later when working on CSS */}
      <hr />
    </article>
  );
};

export default Post;
