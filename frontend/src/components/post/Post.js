import React from 'react';
import './Post.css'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../context/UserContext';


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
  const [alreadyLiked, setalreadyLiked] = useState(post.likes.includes(userInfo._id) ? true : false)



  console.log(post);

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

    console.log(response);
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

  console.log(response);
}


  return(
    <>
      <article 
      id='eachPost'
      data-cy="post" 
      key={ post._id }
      className="row-span-1 m-3 py-8 bg-white rounded-xl shadow-lg space-y-2"
      >{post.poster.firstName}<br/>
        { post.message }<br/>
      {postDate} posted at: {postTime} {numLikes} Likes

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