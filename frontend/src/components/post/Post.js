import React from 'react';
import NewCommentForm from '../comment_form/CommentForm';
import Like from '../like/Like';
import Delete from '../delete/Delete';

import './Post.css';
import CommentFeed from '../comment_feed/CommentFeed';

const Post = ({post, toggleRefresh}) => {
  var date = new Date(post.createdDateTime);
  var formattedDate = date.toUTCString()

  return(
    <>
      <div className="post">
        <div className="post-container">
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
          <div className="post-content">
            <article className="post-message" data-cy="post" key={ post._id }>{ post.message } </article>
            <article className="post-date" data-cy="post" key ={ post.id }>{ formattedDate } </article><br></br>
            <Like likes={post.likes} post_id={ post._id } didUserLikeThis={post.didUserLikeThis}/>
            {(post.didUserPostThis && <Delete post_id={ post._id}/>)}
          </div>
        </div>
      </div>
    <NewCommentForm post_id={ post._id } toggleRefresh={toggleRefresh}/>
    <CommentFeed comments={post.comments}/>
    </>
  )
}

export default Post;