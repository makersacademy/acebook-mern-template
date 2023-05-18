import React from 'react';
import Like from '../like/Like';
import Delete from '../delete/Delete';

import './Post.css';

const Post = ({post}) => {
  var date = new Date(post.createdDateTime);
  var formattedDate = date.toUTCString()

  const toggleRefresh = () => {
    console.log('clicked!')
  }

  return(
    <>
    <div className="user-info">
      <div className="user-profile-picture" >
        {post.author.photo ? (
          <img src={post.author.photo} alt="user-profile"/>
        ) : (
          <img src="/happy-fox.jpeg" alt="default-profile" />
        )}
      </div>
      <h3 className="user-name">{ post.author.userName }</h3>
    </div>
    <article data-cy="post" key={ post._id }>{ post.message } { formattedDate } </article>
    <Like likes={post.likes} post_id={ post._id } didUserLikeThis={post.didUserLikeThis}/>
    <Delete post_id={ post._id} toggleRefresh={toggleRefresh}/>
    </>
  )
}

export default Post;
