import './Post.css';
import React from 'react';

const Post = ({post}) => {
  return(
    <div>
      <article class="post" data-cy="post" key={ post._id }>{ post.message }</article>
    </div>
  )
}

export default Post;

// post.comment. i need an area for someone to make a comment
// this is also where we can add our likes

// add text area
// add submit button
// setup handleSubmit

// make a like component 

// research making a folder called fetchers
