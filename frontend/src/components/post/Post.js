import React, { useState } from 'react';
import './Post.css';

const Post = ({post}) => {
  const [details, setDeteils] = useState(false);

  /*in CSS we have 2 classes to button, and here we can 
  *chanhe class every time then click the button
  */
  const btnClassName = details ? 'post-full-text' : 'post-less-text';



  return(
    <div className='post'>
      {/* post section start
        * each post inclide: 
        * header: user icon, user name and timestamp,
        * body: article with post text,
        * footer: likes and comments buttons
        * comments block after footer
      */}
      <div className='post-header'>
        <img className='user-icon' alt="user-icon" src='./user-icon.png'/>
        <div className='post-header-info'>
          <p>User Name</p>
          <label>01.01.2020 at 12:03</label>
        </div>
      </div>
      <div className='post-body'>
        <article className={btnClassName} data-cy="post" key={ post._id }>
          { post.message }
        </article>
      </div>
      <div className='post-footer'>
        {/* .show button only if length more then 4 lines of text */}
        {post.message.length > 390 && <button className='btn-details' onClick={() => setDeteils(prev => !prev)}>
          {details ? 'Show less...' : 'Show more...'}
        </button>}
      </div>
    </div>
  )
}

export default Post;
