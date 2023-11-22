import React from 'react';
import './Post.css';
import Comment from '../comment/Comment';
import Like from '../like/Like';

const Post = ({post, userId}) => {
  // Format datetime of post
  console.log(post)
  const date = new Date(post.created)
  const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-UK', dateFormat).format(date);

  return(
    <div className='post-box'>
      <div className='post-row'>
        <div className='flex-align-vertical post-avatar-gap'>
          <img src="logo192.png" alt='avatar-image' className='avatar avatar-small'/>
          <p data-cy="post-author" className='post-author'>{post.author.email}</p>
        </div>
        <p data-cy="post-date" className='post-date'>{formattedDate}</p>
      </div>
      <div className='post-content'>
        <p data-cy="post-content" key={ post._id }>{ post.content }</p>
      </div>
      <div className='post-row'>
        <Like post={post} userId={ userId }/>
        <div className='flex-align-vertical post-comments-gap'>
          <a>View comments</a>
          <button data-cy="post-comment" className='primary-btn'>Add comment</button>
        </div>
      </div>
      <div data-cy="post-comments" className='post-comments' >
        { post.comments.map (
          (comment) => ( <Comment comment={ comment } userId={ userId }/> ))
        }
      </div>
    </div>
  )
}

export default Post;
