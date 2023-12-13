import React, { useState, useEffect } from "react";
import MessageHeader from "../messageHeader/MessageHeader";
import CommentFeed from "../commentFeed/CommentFeed";
import "./Post.css"


const Post = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [areCommentsVisibile, setAreCommentsVisibile] = useState(false)


 // generating image path
  // **** NOTICE: change to different url when app deployed ****
  let imageSource = `http://localhost:8080/uploads/${post.image_path}`;

  const toggleCommentVisibility = () => {
    setAreCommentsVisibile(!areCommentsVisibile);
  }

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
    <article className="post-section" data-cy="post" key={post._id}>
      <div id="post-msg-header">
        <MessageHeader user_id={post.user_id}/>
      </div>
      <div id="post-msg-content">
        {post.message}
      </div>      

      <br />
      {/* if image exists display it */}
      {post.image_path && (
        <img className="post-image"
          src={imageSource}
          alt={imageSource}
          width={"700px"}
          data-cy="post-image"
        />
      )}
      <br />
      
      <button className="button-7" onClick={handleLikeClick}>
        Like ({likeCount})
      </button>
      <button className="button-7" id="show-comments-button" onClick={toggleCommentVisibility}>{areCommentsVisibile ? 'Hide comments' : 'Comments 💬'}</button>
      {areCommentsVisibile && (

        <CommentFeed post_id={post._id} />

        )}
      </article>
    );
  };


export default Post;
