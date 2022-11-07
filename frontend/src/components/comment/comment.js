import React, {useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const elementPaperPlane = <FontAwesomeIcon icon={ faPaperPlane } size = '2x' />

const Comment = ({ navigate }) => {

  const [comment, setComment] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const loadComments = () => {
    if(token) {
      fetch("/comments", {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        console.log(data);
        setComment(data.comments);
        ;
      })
    }
  }

    return(
      <>
      {/* SEE COMMENTS*/}
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

export default Comment;