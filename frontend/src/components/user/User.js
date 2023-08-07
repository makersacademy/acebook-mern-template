import React from 'react';

const User = ({user}) => {
    return(
        <article data-cy="user" key={ user._id }><h2>{ user.username }:</h2></article>
    )
    }

export default User;