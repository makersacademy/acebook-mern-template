import React from 'react';
import { useState } from 'react';
// one state that defaults as an empty string
// apply the state to the form
// useEffect hook
// handleCommentSubmit function

const Post = ({post}) => {

  const [commentMessage, setCommentMessage] = useState('');

  

  return(
    <>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <form>
        <textarea
          value={commentMessage}
          onChange={(event) => setCommentMessage(event.target.value)}
          type="text"
          placeholder='What do you think?'
          required>  
        </textarea>
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
