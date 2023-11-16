import React from 'react';
import './Post.css'

const Post = ({post}) => {

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false, };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return(
    <article data-cy="post" key={ post._id }>
      { post.message }<br />
      <small className="smallText">{formatDate(post.date)}</small></article>
  )
}

export default Post;
