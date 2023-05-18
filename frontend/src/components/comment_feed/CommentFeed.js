import Comment from '../comment/Comment';

const CommentFeed = ({comments}) => {
  return (
    comments.map(
      (item) => ( <Comment comment={ item.message } author={item.author} key={ item._id }/> )
    )
  )
}

export default CommentFeed
