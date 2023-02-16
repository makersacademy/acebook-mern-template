import React from 'react';

const Comment = ({comment}) => {
    return(
        <article data-cy="comment" key={ comment._id }>
            { comment.content }
        </article>
    )
}

<<<<<<< HEAD
export default Comment;
=======
export default Comment;
>>>>>>> e716172e854d4b79b76b5f5feecbaf7ce9959863
