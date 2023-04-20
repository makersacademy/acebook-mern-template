import React from 'react';
import './Post.css';
import LikeButton from '../likeButton/LikeButton';
;

//funstion saving newMessage 
function updatedMessage(id) {
  const newMessage = prompt("Enter your NEW message:")
  console.log(newMessage)

};

module.export = updatedMessage;

const Post = ({post}) => {
  return(
    <p>
      <article data-cy="post" key={ post._id }>{ post.message }
      <div>
        <div><LikeButton/></div>
        <button onClick={() => {updatedMessage(post._id)}}>Edit Post</button>
      </div>
      </article>
    </p>
    )
}

export default Post;

