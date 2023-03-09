import React from 'react';
import './Post.css'

const Post = ({ post }) => {
  return (
    <article
      id='eachPost'
      data-cy="post"
      key={post._id}
    // className="row-span-1 m-3 py-8 bg-white rounded-xl shadow-lg space-y-2"
    >{post.message}</article>
  )
}

export default Post;