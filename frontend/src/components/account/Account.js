import React, { useEffect, useState } from 'react';
import EditAccountButton from '../edit-account/EditAccountButton';

const Account = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      fetch("/accounts", {
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

  // one edit button takes you to an edit account component

  return(
    <div>
      {user.photo ? (
        <img src={ user.photo } alt="user-profile" />
      ) : (
        <img src="/happy-fox.jpeg" alt="default-profile" />
      )}

      <h3 className="user-name">{ user.userName }</h3>
      <EditAccountButton />
      <h3 className="user-email">{ user.email }</h3>
      <h3 className="user-password">{ user.password }</h3>
      <button id="edit-account-button">Edit account</button>
    </div>
  )
}

export default Account;
