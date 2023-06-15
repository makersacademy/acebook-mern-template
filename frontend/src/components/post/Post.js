import React, { useState } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import { handleSendingNewLike } from '../../fetchers';
import './Post.css';

const Post = ({post}) => {
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const handleLike = async () => {
    let newCount = likeCount + 1
    await handleSendingNewLike(token, post, '/posts/add-like');
    setLikeCount(newCount);
  }

  const getImageLink = () => {
    if (post.usersRace === "wizard") {
      return '/Wizard.jpg' 
    } else if (post.usersRace === "hobbit") {
      return '/Hobbit.jpg'
    } else if (post.usersRace === "dwarf") { 
      return '/Dwarf.jpg'
    } else if (post.usersRace === "sauron") {
      return '/Sauron.jpg'
    } else if (post.usersRace === "elf") {
      return '/elf1.jpg'
    } else if (post.usersRace === "orc") {
      return '/orc.jpg'
    } else if (post.usersRace === "wraith") {
      return '/Wraith.jpg'
    } else if (post.usersRace === "man") {
      return '/Man.jpg' 
    } else { 
      return '/Sauron2.jpg'
    }
  }

  return (
    <>
      <h2>{ post.username }</h2>
      <img alt='icons' src={getImageLink()} />
      <article class='post' data-cy="post" key={post._id}>
        {post.message} - Likes: {likeCount}
        <LikeButton onLike={handleLike} />
      </article>
    </>
  );
};

export default Post;
