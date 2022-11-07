import React from 'react';
import "./NewComment.css";


const NewComment = ({}) => {
  return (
    <div class="new-comment-container">
      <form class="new-comment-form">
        <input placeholder="Respond to this joke of a post..." class="new-comment" type="text" />
        <input role='submit-button' class='submit-button' type="submit" value="Retaliate" />
      </form>
    </div>
  )
}
export default NewComment;