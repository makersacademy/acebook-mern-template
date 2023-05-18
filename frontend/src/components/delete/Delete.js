import React, { useState, useContext } from 'react';
import './Delete.css';

import { refreshContext } from '../feed/Feed';

const Delete = ({post_id}) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [refresh, setRefresh] = useContext(refreshContext)

  const handleDelete = async () => {
    if(token) {
      fetch('/posts/delete', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({post_id: post_id})
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
      })
      // executes the callback function whenever form is submitted
      setRefresh(!refresh)
    }
  }

  return (
    <>
    <button onClick={handleDelete} className="delete-button">❌</button>
    </>
    )
}

export default Delete