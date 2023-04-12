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

  const deleteAccount = () => {
    if(token) {
      fetch("/users", {
        headers: { 'Authorization': `Bearer ${token}` },
        method: "DELETE"
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          window.localStorage.removeItem("token")
          navigate('/login')
        })
        .catch(error => console.log(error));
    }
  }

  if(token) {
    return(
      <>
        <h1>Account Information</h1> <br></br>
        <div class="info-container">
          <h2>Email</h2>
          {userData.email}
          <div class="btn-container">
            <button className="account-btn">Change Email</button>
          </div>
        
        <br></br>
        <br></br> 
            <h2>Username</h2>
            {userData.username}

          
          <div class="btn-container">
            <button className="account-btn">Change Username</button>
          </div>

        <br></br>
        <br></br>

        </div>


        <div>
          
          <button className="account-btn">Change Password</button>
          <button className="account-btn">Change Avatar</button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <button className="delete-btn" onClick={deleteAccount}>Delete Account</button>
        </div>





      </>
      

    )
  }

  
}

export default AccountPage;