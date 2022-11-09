import React, {useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const elementPaperPlane = <FontAwesomeIcon icon={ faPaperPlane } size = '2x' />

const CommentForm = ({ postId, loadComments }) => {

  const [comment, setComment] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));


    const handleCommentSubmit = async (event) => {
        event.preventDefault();
      
        if (token) fetch('/comments', {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: token, message: comment, post: postId})
        })
          .then(response => response.json())
          .then(
            data => {  
            setComment('');
            loadComments(); 
            console.log(data);
          })     
      }

    const handleCommentChange = (event) => {
      setComment(event.target.value)
    }

    return(
      <>
      {/* WRITE COMMENT*/}
      <div className="comments">
      <div className="comments-box">
        <div className="box-profile">
          <img src="/images/bird-avator.png" alt="avatar" className="profile-pic" ></img> 
        </div>
        <div className="box-bar">
          <input type="text" placeholder='Write a comment...' className="bar-input" value={ comment } onChange={ handleCommentChange }></input>
          <button onClick={ handleCommentSubmit } className="write-comment-btn">{ elementPaperPlane  }</button>
        </div>
      </div>
    </div>
  </>   
        
    )
}

export default CommentForm;