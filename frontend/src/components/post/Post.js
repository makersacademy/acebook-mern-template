import React from 'react';

const Post = ({post, show}) => {
  return(
    <>
    <article data-cy="post" key={ post._id }>{ post.message }</article>
    <article data-cy="post" key={ 'userName' }>{ post.userName }</article>
    </>
  )
}

export default Post;
