import React from 'react';
import './Post.css'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useEffect } from 'react';
import CommentModal from '../commentModal/Comment';


const Post = ({post}) => {

  const postedAt = post.createdAt;
  const date = new Date(postedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();


  const { userInfo } = useContext(UserContext)
  const postDate = (day + "-" + month + "-" + year)
  const postTime = (hours + ":" + minutes)
  const [numLikes, setnumLikes] = useState(post.likes ? post.likes.length : 0);
  const [likes, setLikes] = useState(post.likes)
  const [alreadyLiked, setalreadyLiked] = useState(post.likes.includes(userInfo._id) ? true : false)
  const [numComments, setnumComments] = useState(0)
  const [comments, setComments] = useState()


  const [currentComment, setCurrentComment] = useState("");




  const loadNumComments = async () => {
    const token = window.localStorage.getItem("token");

    if(token) {
      const response = await fetch(`/comments/${post._id}`);
      const json = await response.json();

      if(response.ok) {
        setnumComments(json.comments.length);
        setComments(json.comments);
      }
    }
  }
  


  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if(token){
      loadNumComments()
      
    }
  },[])
  


  const handleLike = async () => {
    const token = window.localStorage.getItem("token");

    let formattedBody = { "postId": post._id, "userId": userInfo._id }

    const response = await fetch(`/posts/${post._id}/like`, {
      method: "put",
      body: JSON.stringify(formattedBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })

    if (response.ok) {
      setnumLikes(numLikes + 1);
      setalreadyLiked(true);
      //refreshPosts();
    }

    console.log(response);
    //props.refreshPosts();
}

const handleUnlike = async () => {
  const token = window.localStorage.getItem("token");

  let formattedBody = { "postId": post._id, "userId": userInfo._id }

  const response = await fetch(`/posts/${post._id}/unlike`, {
    method: "put",
    body: JSON.stringify(formattedBody),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  })

  if (response.ok) {
    setnumLikes(numLikes - 1);
    setalreadyLiked(false);
    //refreshPosts();
  }

  console.log(response);
  //props.refreshPosts();
}

const handleComment = async (event) => {
  const token = window.localStorage.getItem("token");
  event.preventDefault();
  setCurrentComment("");

  let formattedBody = { "comment": currentComment, "post": post._id, "poster": userInfo._id }
  console.log(JSON.stringify(formattedBody));
    //console.log("current comment submitted: ", currentComment);
  const response = await fetch('/comments', {
    method: "POST",
    body: JSON.stringify(formattedBody),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },

  })

  if (response.ok) {
    console.log("comment made")
    setnumComments(numComments + 1);
    loadNumComments();
    
  } else {
    console.log("response was, :", response);
  }
}

const profileLink = `/profile/${post.poster._id}`

const handleCommentChange = (event) => {
  setCurrentComment(event.target.value)
}

  return(
    <>
      <article 
      id='eachPost'
      data-cy="post" 
      key={ post._id }
      className="row-span-1 m-3 py-8 bg-white rounded-xl center shadow-lg space-y-2"
      ><a href={profileLink}>{post.poster.firstName}</a><br/>
        { post.message }<br/>
      {postDate} posted at: {postTime}<br/> {numLikes} Likes {numComments} Comments
      <form onSubmit={handleComment} className="form-inline">
      <div class="form-group mb-2">
        <input type="text"value={ currentComment } onChange={handleCommentChange} className="form-control" id="comment" placeholder="Write a comment"/>
      </div>
      <button type="submit" className="btn btn-primary mb-2">Post Comment</button>
      </form>

      {numComments>0 ? <CommentModal postID={ post._id} loadComment={loadNumComments} comments={comments}/> : <></>}

      <br/>
      {alreadyLiked == true ?
        <button type="button" class="btn btn-primary btn-sm" id="like-button" onClick={() => handleUnlike(post._id)} >unlike</button>
        :
        <button type="button" class="btn btn-primary btn-sm" id="like-button" onClick={() => handleLike(post._id)}>Like</button>
    }
      </article>
    </>
  )
}

export default Post;