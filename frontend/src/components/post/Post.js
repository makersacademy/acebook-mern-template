import React from 'react';
import NewCommentForm from '../comment_form/CommentForm';

const Post = ({post}) => {
  return(
    <>
    <article data-cy="post" key={ post._id }>{ post.message }{post.comments}</article>
    <h3>make a comment</h3>
    <NewCommentForm />
    </>
  )
}

export default Post;
