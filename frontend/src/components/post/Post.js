import React from 'react';

// Define a Post component which receives a post object and an onLike function as props.
const Post = ({post, onLike}) => {
  // Define a handleLike function that calls the onLike function prop with the ID of the post.
  const handleLike = () => {
    onLike(post._id);
  };

  return (
    // Render an article HTML element for each post.
    // Render a button that, when clicked, calls the handleLike function.
    // The button also displays the count of likes the post has received.
    <article data-cy="post" key={ post._id }>
      { post.message }  
      <button onClick={handleLike}>👍 | { post.like }</button>
    </article>
  )
}

export default Post;
