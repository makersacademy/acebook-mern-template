import React, { useEffect, useState } from 'react';

const Post = ({ post }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [ownerData, setOwnerData] = useState({})

  // get info of the owner of each post
  useEffect(() => { // not sure if useEffect is really necessary here
    if(token) {
      fetch(`/posts/${post.createdBy}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setOwnerData(data.ownerData)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [token])

  return (
    <>
      <article data-cy="post" key={ post._id }>{ post.message }</article>
    </>
  )
}

export default Post;
