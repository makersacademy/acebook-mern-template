import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Comment = ({ comment }) => {
  console.log(comment);
  return (
    <div class="comment">
      <div class="comment-header">
        <h4 class="comment-author">{ comment.author.name }</h4>
        <p class="timestamp">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
      </div>
      <p class="comment-message">{ comment.message }</p>
    </div>
  );
}

export default Comment;