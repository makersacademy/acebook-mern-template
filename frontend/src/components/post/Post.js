import React, { useState, useEffect } from "react";
import styles from "./Post.module.css";
import ReactTimeAgo from "react-time-ago";

const Post = ({ post, setReload }) => {
  const user_id = window.localStorage.getItem("user_id");
  const token = window.localStorage.getItem("token");

  const isPostLikedByUser = post.likes.includes(user_id);

  const [isLiked, toggleIsLiked] = useState(isPostLikedByUser);

  const handleLikeToggle = async () => {
    toggleIsLiked((likeState) => !likeState);
    console.log(post);
    if (user_id) {
      let url = isLiked ? "/posts/unlike" : "/posts/like";
      let response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: post._id, _user_id: user_id }),
      });
      const data = await response;
      if (response.status !== 204) {
        console.log(data.error);
      } else {
        setReload(true);
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.postHeader}>
          <div className={styles.avatar}>
            <img alt="avatar" src={post.user_id && post.user_id.image} />
          </div>
          <div>
            <h1> {post.user_id && post.user_id.display_name}</h1>
            <p>
              Posted{" "}
              <ReactTimeAgo
                date={post.createdAt}
                locale="en-US"
                timeStyle="twitter"
              />{" "}
              ago
            </p>
          </div>
        </div>
        <article className={styles.content} data-cy="post" key={post._id}>
          {post.message}
        </article>
        <div>
          <div className={styles.postFooter}>
            <div
              className={isLiked ? styles.like : styles.unlike}
              data-cy="like-button"
              onClick={handleLikeToggle}
            >
              <img src="/images/like.svg" alt="like" />
            </div>
            <div className={styles.likesNumber}>
              <div>
                <img src="/images/likes.jpg" alt="Number of likes" />
              </div>
              <p>{post.likes.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
