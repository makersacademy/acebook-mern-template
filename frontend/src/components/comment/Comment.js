import React from 'react';
import './Comment.css';

const Comment = ({comment}) => { 
    return(
      <div> 
        <h4>THIS IS A COMMENT</h4>
      </div>
    )
}

  //   <div className='comment-box'> 
  //     {/* <article data-cy="comment-author" className='comment-author'>{comment.author}</article>
  //     <article data-cy="comment-date" className='comment-date'>{comment.created_at}</article>
  //     <article data-cy="comment-content" key={comment._id } className='comment-content'>{ comment.content }</article>
  //     <div style={{display: 'flex'}}>
  //       <img src='thumb-icon.png' className='like-btn' alt='thumb'/>
  //       <article data-cy="comment-likes" className='like-number'>{comment.number_of_likes}</article>
  //     </div>
  //   </div>
  // ) */}


export default Comment;