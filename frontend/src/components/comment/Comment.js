import React from 'react';


const Comment = ({comment}) => {
    console.log("comment", comment)
    console.log("comment user", comment.user)
    return(
        <article data-cy="comment" key={comment._id}>
        <h2>{comment.user.username}:</h2>
        <p>{comment.comment}</p>
        </article>
    )
}


export default Comment;


