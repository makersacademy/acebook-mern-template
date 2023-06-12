import React from "react";
import { useState } from "react"
import { useParams } from "react-router";

const DeletePost = ({navigate}) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const post_id = useParams();
  
  if(token) {
    fetch("/posts/" + post_id.id , {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`
      }
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        console.log(data.message);
      })
    })
  }

  navigate('/posts');
}

export default DeletePost;