import { useEffect, useState } from 'react';
import Comment from '../comment/Comment';
import './CommentFeed.css'

const CommentFeed = ({comments}) => {

  return (
    <div className='comments-feed'>
    {comments.map(
      (item) => ( <Comment comment={ item.message } author={item.author} key={ item._id }/> )
    )}
    </div>
  )
}

export default CommentFeed
