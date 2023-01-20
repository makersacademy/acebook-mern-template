import './Comment.css';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  
  return (
    <div className="comment">
      <div className="comment-header">
          <Link to={`/users/${comment.author._id}`} className="comment-author-link" >
            <h4 className="comment-author">{comment.author.name}</h4>
          </Link>
        <p className="timestamp">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
      </div>  
      <p className="comment-message">{ comment.message }</p>
      <img
          className='post-image'
          src={comment.image}
        /> 
    </div>
  );
}

export default Comment;