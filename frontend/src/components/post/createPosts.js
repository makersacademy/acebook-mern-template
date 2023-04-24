import React from 'react';

const Post = ({post}) => {
    return(
        <article data-cy="post" key={ post._id }>{ post.message }</article>
        // <button onClick={logout}>
        //     Logout
        // </button>
    )
}

export default Post;
