import React from 'react';
import Like from '../like/Like';
import './Post.css';

const Post = ({post}) => {
  var date = new Date(post.createdDateTime);
  var formattedDate = date.toUTCString()
  
  return(
    <>
    <h3>{ post.author.userName }</h3>
    <div className="user-profile-picture" >
      <img src={post.author.photo} alt="user-profile-picture"/>
    </div>
    <article data-cy="post" key={ post._id }>{ post.message } { formattedDate } </article>
    <Like likes={post.likes} post_id={ post._id } didUserLikeThis={post.didUserLikeThis}/>
    </>
  )
}

export default Post;
