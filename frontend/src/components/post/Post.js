import React, { useEffect, useState } from 'react';



const handleDelete = (postId, token, setPosts) => {
  console.log("token", token);
  fetch(`/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    console.log("Response status:", response.status);
    if (response.status === 200) {
      // Remove the deleted post from the posts state
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      console.log("postId", postId);
    } else if (response.status === 403) {
      console.error('You are not allowed to delete this post.');
    } else {
      console.error('Error deleting a post');
    }
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

const Post = ({ post, token, setPosts }) => {
  const userid = window.localStorage.getItem("userid");
  const showDeleteButton = post.user._id === userid;
  console.log("POST", post);
  console.log("POST.USER", post.user);
  console.log("showDeleteButton", showDeleteButton);
  if (post.user === null){
    
    return( 
      <article data-cy="post" > <p>ERROR</p></article>
    )
  }
  else{
    return(
      <article 
        data-cy="post" 
        key={ post._id }
        >
          <h2>
            { post.user.username }:
          </h2>
          <p>
            { post.message }
          </p>
          <div>
            
            {showDeleteButton && (
              <button 
              data-cy="delete-button"
              onClick={() => handleDelete(post._id, token, setPosts)}>
                Delete
              </button>
            )}
          </div>
      </article>
    )
  }
}


export default Post;
export { handleDelete };

