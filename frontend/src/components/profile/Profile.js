import React, { useEffect, useState } from 'react';

const Profile = (props) => {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if(token) {
      const { username } = props.useParams()

      fetch("/user", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username: username })
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setFirstName(data.firstName)
          setLastName(data.lastName)
          setUserName(data.userName)
        })
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem("token")
    props.navigate('/login')
  }
  
  if(token) {
    return (
      <div data-cy="profile">
        <h2>Posts</h2>
        <button onClick={logout}>
          Logout
        </button>
        <h3>{firstName}</h3>
        <h3>{lastName}</h3>
        <h3>{userName}</h3>
      </div>
    )
  } else {
    props.navigate('/signin')
  }
}

export default Profile;