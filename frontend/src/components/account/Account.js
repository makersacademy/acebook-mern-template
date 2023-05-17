import React, { useEffect, useState } from 'react';

const Account = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      const userId = user._id;
      console.log(userId)
      fetch(`/users?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(async data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        setUser(data.user);
      })
    }
  }, [])

  // get request to get the user's info

  // display user info below

  // one edit button takes you to an edit account component

  return(
    <div>
      {user.photo ? (
        <img src={ user.photo } alt="user-profile" />
      ) : (
        <img src="/happy-fox.jpeg" alt="default-profile" />
      )}

      <h3 className="user-name">{ user.userName }</h3>
      <h3 className="user-email">{ user.email }</h3>
      <h3 className="user-password">{ user.password }</h3>
      <button id="edit-account-button">Edit account</button>
    </div>
  )
}

export default Account;
