import React, { useEffect, useState } from 'react';

const Profile = ({ navigate }) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");

  useEffect(() => {
    if(token) {
      fetch("/user", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: email })
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setUserEmail(data.email)
          setUserFirstName(data.firstName)
        })
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }
  
  if(token) {
    return (
      <>
        <h2>Posts</h2>
        <button onClick={logout}>
          Logout
        </button>
        <h3>{userEmail}</h3>
        <h3>{userFirstName}</h3>
      </>
    )
  } else {
    navigate('/signin')
  }
}

export default Profile;