import React, { useEffect, useState } from 'react';
import EditAccountButton from '../edit-account/EditAccountButton';
import './Account.css';

const Account = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [refresh, setRefresh] = useState(0);

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
        setUser(data.user)
      })
    }
  }, [refresh])

  const toggleRefresh = () => {
    // sets whatever is inside refresh to the opposite, triggering a refresh
    // through useeffect. this is activated whenever the newpostform is
    // submitted
    setRefresh(prevRefresh => prevRefresh + 1);
  };

  return(
    <div>
      <div className="container">

      <div className="flex-container">
        {user.photo ? (
          <img src={ user.photo } alt="user-profile" />
        ) : (
          <img src="/happy-fox.jpeg" alt="default-profile" />
        )}
      </div>

      <div className="flex-container">
        <h3 className="user-name">Your current username: { user.userName }</h3>
        <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"userName"}/>
      </div>

      <div className="flex-container">
        <h3 className="user-email">Your current email: { user.email }</h3>
        <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"email"}/>
      </div>

      <div className="flex-container">
        <h3 className="user-password">Your current password: { user.password }</h3>
        <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"password"}/>
      </div>

      </div>
    </div>
  )
}

export default Account;
