import React, {useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const elementPaperPlane = <FontAwesomeIcon icon={ faPaperPlane } size = '2x' />

const CommentForm = ({ navigate }) => {

  const [comment, setComment] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  // const loadComments = () => {
  //   if(token) {
  //     fetch("/comments", {
  //       headers: {
  //       'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(async data => {
  //       window.localStorage.setItem("token", data.token)
  //       setToken(window.localStorage.getItem("token"))
  //       console.log(data);
  //       setComment(data.comments);
  //       ;
  //     })
  //   }
  // }

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
      
        if (token) fetch('/comments', {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: token, message: comment})
        })
          .then(response => response.json())
          .then(
            data => {   
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
      {/* SEE COMMENTS*/}
    </div>
    {/* <div className="all-comments-section">
    <img src="/images/bird-avator.png" alt="avatar" className="comment-author-pic" ></img> 
    <div id="single-comment-wrapper">
      <span className="comment-author">Comment Author</span>
      <span className="comment-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span>
    </div>
  </div> */}
  </>   
        
    )
}

export default CommentForm;