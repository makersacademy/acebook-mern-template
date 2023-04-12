import React, {useState} from 'react';

const Post = ({post}) => {

  const [likeCount, setLikeCount] = useState(post.likes.length)
  const [token] = useState(window.localStorage.getItem("token"));

  const handleLike = async (event) => {
    event.preventDefault();
    try {
    const response = await fetch(`/posts/${post._id}/like`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }, 
      body: JSON.stringify({token}),
    });

    console.log(response)
    const updatedPost = await response.json();
    if (response.ok) {
      setLikeCount(updatedPost.likes.length);
    } else {
      console.log(`Failed to find post with ID ${post._id}`)
    }
  } catch (error) {
    console.log(error)
  }}

  

  return(
    <>
    <div>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
      <button onClick={handleLike}>Like</button>
      <div>{likeCount}</div>
    </div>
    </>
  )
}

export default Post;