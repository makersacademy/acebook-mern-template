import React from 'react';

const Post = ({post}) => {
  return(
    <div className='post-div'>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
      <a href='/post/post._id'><p data-cy='comments-link'>Comments: {post.comments.length}</p></a>
    </div>
  )
}

export default Post;
