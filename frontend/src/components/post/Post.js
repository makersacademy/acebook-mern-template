import React, { useEffect, useState } from 'react';

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [ownerData, setOwnerData] = useState({});

  useEffect(() => {
    if (token) {
      fetch(`/posts/${post.createdBy}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token);
          setToken(window.localStorage.getItem("token"));
          setOwnerData(data.ownerData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token]);

  const hasImage = 'image' in post // boolean: check if post has an image
  let imageLocation;
  if (hasImage) { imageLocation = `/uploads/${post.image.fileName}` }

  return (
    <>
      <article data-cy="post" key={post._id}>{post.message}</article>
      <div>
        {hasImage ? <img src={imageLocation}></img> : null }
      </div>
    </>
  )
}

export default Post;
