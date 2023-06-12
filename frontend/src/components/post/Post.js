import React from 'react';

const Post = ({post}) => {
  console.log(post)
  return(
    <>
    <p>{ post.username }</p>
    <article data-cy="post" key={ post._id }>{ post.message }</article>
    </>
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
