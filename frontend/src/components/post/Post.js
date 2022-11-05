import React from 'react';
import Comment from '../comment/Comment'
import "./Post.css";

const Post = ({ post }) => {
  return (
    <article data-cy="post" key={post._id}>
      <div class="header-container">
        <img class="profile-image" src='https://iili.io/mVK9G2.png' alt='kyle' />
        <div class="name-and-time-container">
          <div class="username">{"{ Name }"}</div>
          <div class="post-time">{"{ Post time }"}</div>
        </div>

      </div>
      <div class="post-image-container">
        <img class="post-image" src='https://i.postimg.cc/T5vGJyXj/kyle.png' alt='kyle' />
      </div>
      <div class="message-container">
        <div class="message">{post.message}</div>
        <div class="hates-container">
        <img id="hate-image" src={require('../../images/kylerage2.png')} alt='hates' />
        <div>Hates {"{ Hate quantity }"}</div>
        </div>
        <Comment />
      </div>
    </article>
  )
}

export default Post;
