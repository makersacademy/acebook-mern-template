import React from 'react';
import './Post.css'


const Post = ({post}) => {

  const postedAt = post.createdAt;
  const date = new Date(postedAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const postDate = (day + "-" + month + "-" + year)
  const postTime = (hours + ":" + minutes)


  return(
    <>
      <article 
      id='eachPost'
      data-cy="post" 
      key={ post._id }
      className="row-span-1 m-3 py-8 bg-white rounded-xl shadow-lg space-y-2"
      >{ post.message }<br/>
      {postDate} posted at: {postTime}
      </article>
    </>
  )
}

export default Post;