import React from 'react';

const Comment = ({comment}) => {
    return(
        <article data-cy="comment" key={ comment._id }>
            { comment.content }
        </article>
    )
}

export default Comment;
