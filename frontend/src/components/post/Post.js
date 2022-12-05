import React from "react";


const Post = ({ post }) => {
  return (
    <div>
      <article data-cy="post" key={post._id}>
        {post.message}
      </article>
      <article data-cy="post" key={post._id}>
        {new Date(post.time).toString().slice(0, 28)}
      </article>
      <article data-cy="post" key={post._id}>
        MOST RECENT COMMENT: 
        {post.comments[post.comments.length - 1].user} ADDED A COMMENT:{" "}
        {post.comments[post.comments.length - 1].comment} ON:{" "}
        {new Date(post.comments[post.comments.length - 1].time)
          .toString()
          .slice(0, 28)}
      </article>   
      <article>
        {`${post.likes.length} likes!`}
      </article>

    </div>
  );
};

export default Post;
