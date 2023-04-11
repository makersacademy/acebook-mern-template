import React, {useState} from 'react';

const Post = ({post}) => {

  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleLike = async (event) => {
    event.preventDefault();
    try {
    const response = await fetch(`/api/posts/${post._id}/like`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }, 
      body: JSON.stringify({token: token}),
    });

    console.log(response)
    const updatedPost = await response.json();
    setLikeCount(updatedPost.likes.length);
  } catch (error) {
    console.log(error)
  }}

  

  return(
    <>
    <div>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
      <button onClick={handleLike}>onClick</button>
      <div>{likeCount}</div>
      </div>
    </>
  )
}

export default Post;