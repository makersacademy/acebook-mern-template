import './Comment.css';
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Comment = ({ comment }) => {
  
  return (
    <div className="comment">
      <div className="comment-header">
        <h4 className="comment-author">{comment.author.name}</h4>
        <p className="timestamp">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
      </div>
      <p className="comment-message">{ comment.message }</p>
    </div>
  );
}

export default Comment;