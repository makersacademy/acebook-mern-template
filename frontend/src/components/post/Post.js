import React from 'react';
import './Post.css';


const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  return `${formattedDate} - ${formattedTime}`
};

const Post = ({post}) => {
  const formattedDate = formatDate(post.dateCreated)
  return(
    <article className="post-box" data-cy="post" key={ post._id }>
      <p id="message">{ post.message } </p>
      <p id="date">{ formattedDate }</p>
    </article>
  )
}

export default Post;
