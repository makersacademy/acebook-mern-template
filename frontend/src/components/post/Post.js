import React from 'react';

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return `${formattedDate} - ${formattedTime}`
};

const Post = ({post}) => {
  const formattedDate = formatDate(post.dateCreated)
  return(
    <article data-cy="post" key={ post._id }>
      <p id="message">{ post.message } </p>
      <p id="date">{ formattedDate }</p>
    </article>
  )
}

export default Post;
