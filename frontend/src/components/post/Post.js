import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from '../Helpers/Card'

const Post = ({ post }) => {
  return (
    <div>
      <Card>
        <article data-cy="post" key={post._id}>{ post.message }</article>
      </Card>
   
      <div>
        <span>User</span>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default Post;
