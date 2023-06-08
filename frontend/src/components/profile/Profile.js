import React, { useEffect, useState } from 'react';

const Profile = ({ navigate, params }) => {
  const { username }  = params()

  const [userName, setUserName] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  
  useEffect(() => {
    if(token) {
      fetch(`/user?username=${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then( data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))
        
        setFirstName(data.user.firstName)
        setLastName(data.user.lastName)
        setUserName(data.user.userName)
        })
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
  if(token) {
    return (
      <div data-cy="profile">
        <button onClick={logout}>
          Logout
        </button>
        <h2>Profile Page</h2>
        <h3>Name: {`${firstName} ${lastName}`}</h3>
        <h3>username: {userName}</h3>
      </div>
    )
  } else {
    navigate('/login')
  }
}

export default Profile;