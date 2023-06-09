import React from 'react';

const Post = ({post}) => {
  return(
    <>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <form>
        <textarea></textarea>
        <button>Submit</button>
      </form>
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
