import React, { useState } from 'react';

const Post = ({post, userId}) => {
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);

  const postLiked = async (event) => {

    const likes = post.likes;
    
    if(!likes.includes(userId)) {

      likes.push(userId)
      
      const token = window.localStorage.getItem("token")
      let response = await fetch('/posts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ postId: post._id, likes: likes })
      })
  
      if(response.status === 201) {
        console.log(response);
        // TODO: This makes me feel dirty, but until a better solution to update just this component, as opposed to
        // reloading the entirety of the parent feed on every like, I propose we leave this here.
        setNumberOfLikes(numberOfLikes + 1)
        console.log("Like request sent successfully");
      } else {
        console.log('Failed to send like request');
      }
    } else {
      console.log("You've already liked this.");
    }
  }

  const formattedDate = new Date(post.time).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  });
  
// The default image is accessed in the public folder, 
// refactoring needed when upload image API is implimented
  return(
    <article data-cy="post" key={ post._id }>
      <img src={ process.env.PUBLIC_URL + post.user.avatar } alt='avatar' width='50'></img> 
      <p>{ post.user.name }</p>
      <p>{ formattedDate } </p>
      <p>{ post.message }</p>
      <p>Likes: { numberOfLikes } </p>
      <button onClick={postLiked}>Like</button>
    </article>
  )
};

export default Post;
