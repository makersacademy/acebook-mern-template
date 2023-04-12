import React, {useEffect, useState} from 'react';
import './Account.css';

const AccountPage = ({ navigate }) => {
  const [userData, setUserData] = useState({})
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  useEffect(() => {
    if(token) {
      fetch("/users", {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setUserData(data.user)
        })
        .catch(error => console.log(error));
    }
  }, [token])

  if(token) {
    return(
      <>
        <h1>Account Information</h1> <br></br>
        <div>
          <h2>Email</h2>
          {userData.email}
          <br></br>
          <br></br>
          <h2>Username</h2>
          {userData.username} 
        </div>
        <div>
          
        </div>





      </>
      

    )
  }

  
}

export default AccountPage;