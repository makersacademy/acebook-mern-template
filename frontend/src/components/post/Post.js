import React from 'react';
import './Post.css';

const Post = ({post}) => {

  return(
    <article className='post-container' data-cy="post" key={ post._id }>
      {/* change below to display name later */}
      <h3 className='user-display-name'>{ post.user_id.email }</h3> 
      {/* change below to display date nicer later */}
      <p className='date-posted'>{ post.date_posted }</p>
      <p className='message'>{ post.message }</p>
    </article>
  )
}

export default Post;
