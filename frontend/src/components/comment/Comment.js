import React from 'react';


const Comment = ({comment}) => {
    
    return(
        <article data-cy="comment" key={comment._id}>
        <h2>{comment.username}:</h2>
        <p>{comment.comment}</p>
        </article>
    )
}


export default Comment;


