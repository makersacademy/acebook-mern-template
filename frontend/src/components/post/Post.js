import React from 'react';
import moment from 'moment'
import './Post.css'

// Define a Post component which receives a post object and an onLike function as props.
const Post = ({post, onLike}) => {
  // Define a handleLike function that calls the onLike function prop with the ID of the post.
  const handleLike = () => {
    onLike(post._id);
  };

  const formattedTime = moment(post.time).fromNow();

  return (
    // Render an article HTML element for each post.
    // Render a button that, when clicked, calls the handleLike function.
    // The button also displays the count of likes the post has received.
    <article data-cy="post" key={ post._id }>
      <div className='post-container'>
        <div className='name-container'>
          <div className='name'> 
            { post.firstName + " "} 
            { post.lastName} 
        </div>
        </div>
        <div className='message'> { post.message } </div>
        <button className='like-button' onClick={handleLike}>👍 | { post.like }</button>
        <div className='time'> { formattedTime } </div>
      </div>
    </article>
  )
}

export default Post;
