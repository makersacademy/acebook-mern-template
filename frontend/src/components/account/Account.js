import React, { useEffect, useState } from 'react';
import EditAccountButton from '../edit-account/EditAccountButton';
import './Account.css';


const Account = ({ navigate }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [refresh, setRefresh] = useState(false);

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
    } else {
      navigate('/login')
    }
  }, [refresh])

  const toggleRefresh = () => {
    // sets whatever is inside refresh to the opposite, triggering a refresh
    // through useeffect. this is activated whenever the newpostform is
    // submitted
    setRefresh(prevRefresh => !prevRefresh);
  };



  return(
    <div>
      <div className="container">

      <div className="flex-container-photo">
        {user.photo ? (
          <>
          <img src={ user.photo } alt="user-profile" />
          <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"photo"}/>
          </>
        ) : (
          <>
          <img src="/happy-fox.jpeg" alt="default-profile" />
          <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"photo"}/>
          </>
        )}
      </div>

      <div className="flex-container">
        <p className="user-name">Username: { user.userName }</p>
        <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"userName"}/>
      </div>

      <div className="flex-container">
        <p className="user-email">Email address: { user.email }</p>
        <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"email"}/>
      </div>

      <div className="flex-container">
        <p className="user-password">Password: { user.password }</p>
        <EditAccountButton toggleRefresh={toggleRefresh} valueToChange={"password"}/>
      </div>

      </div>
    </div>
  )
}

export default Account;
