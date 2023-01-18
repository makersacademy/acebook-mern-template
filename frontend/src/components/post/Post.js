import React from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Card from '../Helpers/Card';

const Post = ({ post, setPostAdded }) => {
  const userId = window.localStorage.getItem('user_id');
  const token = window.localStorage.getItem('token');

  const handleLike = () => {
    if (userId) {
      fetch('/posts', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ post_id: post._id, user_id: userId }),
      }).then(() => setPostAdded(true));
    }
  };

  return (
    <div>
      <Card>
        <article data-cy="post" key={post._id}>
          {post.message}
        </article>
      </Card>

      <div>
        <span>{post.user_id.name}</span>
        <p>
          {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
        </p>
        <button className="like-button" onClick={handleLike}>
          Like
        </button>
        <span>
          {post.likes.length > 1
            ? `${post.likes.length} people liked this`
            : post.likes.length === 1
            ? `${post.likes.length} person liked this`
            : 'No likes'}
        </span>
      </div>
    </div>
  );
};

export default Post;
