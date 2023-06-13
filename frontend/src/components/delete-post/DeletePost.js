// import React from "react";
// import { useState } from "react"
// import { useParams } from "react-router";

// const DeletePost = ({navigate}) => {
//   const [token, setToken] = useState(window.localStorage.getItem("token"));
//   const post_id = useParams();
  
//   if(token) {
//     fetch("/posts/" + post_id.id , {
//       method: "DELETE",
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//       .then(response => response.json())
//       .then(async data => {
//         window.localStorage.setItem("token", data.token)
//         setToken(window.localStorage.getItem("token"))
//         console.log(data.message);
//       })
//     })
//   }

//   navigate('/posts');
// }

// export default DeletePost;

// -----------------------------------------------------------------------------

// const handleDelete = (postId) => {
//   fetch(`/api/posts/${postId}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(response => {
//       if (response.ok) {
//         // Post deleted successfully, you can update the UI or show a success message
//         console.log('Post deleted successfully');
//       } else {
//         // Handle non-successful responses (e.g., 404, 500)
//         throw new Error('Error deleting post');
//       }
//     })
//     .catch(error => {
//       // Error occurred during deletion, handle the error appropriately
//       console.error('Error deleting post:', error);
//     });
// };

// export default handleDelete;

// -----------------------------------------------------------------------------

import { useEffect, useState } from "react"
import { useParams } from "react-router";

const DeletePost = ({ navigate }) => {
  const [placeholderContent, setplaceholderContent] = useState([]);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const post_id = useParams();
  
  useEffect(() => {
    if(token) {
      fetch("/posts/" + post_id.id , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setplaceholderContent(data.post.message)
        })
    }
  }, [])
    
  const handleDelete = async (event) => {
    event.preventDefault();
    await fetch('/posts/' + post_id.id + "/delete", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
    })
    navigate('/posts');
  }
  
  return(
    <>
      <h2>Delete post: {`${post_id.id}`}</h2>
      <p>{placeholderContent}</p>
      <form onSubmit={handleDelete}>
      <input role='submit-button' id='submit' type="submit" value="Delete" />
      </form>
    </>
  )
}

export default DeletePost;