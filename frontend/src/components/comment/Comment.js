// when doing this, pass the post ID through to the backend !! comment.post_id or post._id

import React from "react";

const Comment = ({ comment }) => {
    return (
        <article data-cy="comment" key ={comment._id}>
            {comment.message}
        </article>
    );
};

export default Comment;